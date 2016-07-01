'use strict';

let gulp = require('gulp');
let config = require('./gulp.config')();
let del = require('del');
let args = require('yargs').argv;
let sequence = require('run-sequence');
let merge = require('merge2');
let $ = require('gulp-load-plugins')({lazy: true});

let port = process.env.PORT || config.server.nodeHostPort;
let environment = args.env || config.config.defaultEnv;
let launch = args.launch;
let customHost = args.customHost;
let failOnVetError = args.failOnVetError;
let debug = args.debug;

const tsks = {
    help: 'help',
    default: 'default',
    definitions: {
        generate: 'generate-app-def',
        delete: 'app_def_delete',
        copyTemplate: 'app_def_copy_template'
    },
    dev: {
        serve: 'serve',
        build: 'build',
        clean: 'clean_dev'
    },
    dist: {
        serve: 'serve-dist',
        build: 'build-dist',
        clean: 'clean_dist'
    },
    inject: {
        vendor: 'inject_bower_scripts',
        local: 'inject_custom_scripts',
        ngTemplates: 'inject_ng_templates'
    },
    ngTemplateCache: {
        generate: 'generate_ng_template_caches'
    },
    shell: {
        generate: 'generate_shell_html',
        delete: 'delete_shell_html',
        copyTemplate: 'copy_shell_html_template'
    },
    vet: {
        vet: 'vet',
        _compileTs: 'vet_compile_ts',
        _lintTs: 'vet_lint_ts',
        _lintTsCopyConfig: 'vet_lint_ts_copy_config',
        _lintTsRun: 'vet_lint_ts_run_lint',
        _lintTsIncrementCounter: 'vet_lint_ts_increment_counter',
        _compileCss: 'vet_compile_less',
        _lintCss: 'vet_lint_less'
    }
};

////////// Task Listing & Default Task //////////

gulp.task(tsks.help, $.taskListing.withFilters(/_/, task => task === tsks.default || task === tsks.help));

gulp.task(tsks.default, [tsks.dev.serve]);

////////// Dev Build Tasks //////////

gulp.task(tsks.dev.serve, [tsks.dev.build], () => {
    serve(true);
});

gulp.task(tsks.dev.build, done => {
    let tasks = [
        tsks.dev.clean, tsks.shell.generate,
        [tsks.inject.vendor, 'compile_scripts', 'compile_styles'],
        ['create_config', 'create_globals'],
        [tsks.inject.local, 'copy_static_to_dev'],
        done
    ];
    if (config.preferences.vetBeforeDevBuild) {
        tasks.unshift(tsks.vet.vet);
    }
    sequence.apply(this, tasks);
});

gulp.task(tsks.dev.clean, done => {
    clean(config.folders.devBuild, done);
});

/* Creates a fresh index.html file from the index.html.template.
   By doing this, we do not have to have index.html in version control, so the constant changes to
   it due to the inject tasks can be ignored. */
gulp.task(tsks.shell.generate, done => {
    log('Generating the index.html shell file.');
    sequence(tsks.shell.delete, tsks.shell.copyTemplate, done);
});

gulp.task(tsks.shell.delete, done => {
    clean(config.shell, done);
});

gulp.task(tsks.shell.copyTemplate, () => {
    let modulePlaceholders = getModulePlaceholders();
    return gulp.src(`${config.folders.client}index.html.template`)
        .pipe($.injectString.replace('<!-- custom-modules -->', modulePlaceholders))
        .pipe($.rename('index.html'))
        .pipe(gulp.dest(config.folders.client))
});

function getModulePlaceholders() {
    return config.modules.reduce((ph, mod) =>
        ph + `    <!-- build:js js/${mod.name}.js -->\r\n` +
            `    <!-- inject:${mod.name}:js -->\r\n` +
            `    <!-- endinject -->\r\n` +
            `    <!-- inject:${mod.name}-templates:js -->\r\n` +
            `    <!-- endinject -->\r\n` +
            `    <!-- endbuild -->\r\n\r\n`, '');
}

gulp.task(tsks.inject.vendor, () => {
    log('Wiring up Bower script dependencies.');

    let wiredep = require('wiredep').stream;
    return gulp.src(config.shell)
        .pipe(wiredep(config.options.wiredep))
        .pipe(gulp.dest(config.folders.client))
});

gulp.task('compile_scripts', ['generate-app-def'], () => {
    log('Transpiling Typescript code to JavaScript');

    let tasks = config.modules.map(mod => {
        let tsProject = $.typescript.createProject('tsconfig.json');
        let tsToCompile = mod.tsToCompile || [`${mod.folder}**/*.ts`];
        let compileTask = gulp.src([].concat(config.definitions.all, tsToCompile))
            .pipe($.typescript(config.options.typescriptBuild));
        return compileTask.js
            .pipe($.ngAnnotate())
            .pipe($.stripLine(`/// <reference path="`))
            .pipe(gulp.dest(mod.jsOutputFolder));
    });
    return merge(tasks);
});

gulp.task('compile_styles', () => {
    log('Compiling LESS files to CSS stylesheets');

    let tasks = config.modules.map(mod =>
        gulp.src(mod.lessToCompile)
            .pipe($.plumber())
            .pipe($.less())
            .pipe(gulp.dest(config.folders.devBuildStyles))
    );
    return merge(tasks);
});

gulp.task('create_globals', done => {
    let Writer = require('simple-file-writer');
    let w = new Writer(`${config.folders.devBuildScripts}globals.js`);
    w.write(`var appComponentPrefix = '${config.globals.appComponentPrefix || 'app'}';`);
    w.write(`var sharedComponentPrefix = '${config.globals.sharedComponentPrefix || 'shared'}';`);
    let appProfile = config.globals.appProfile ? `'${config.globals.appProfile}'` : 'null';
    w.write(`var appProfile = ${appProfile};`);
    done();
});

gulp.task('create_config', () => {
    log('Generating AngularJS constants file to store environment-specific configuration.');

    return gulp.src(config.config.src)
        .pipe($.ngConfig(config.config.moduleName, {
            environment: environment,
            createModule: false
        }))
        .pipe(gulp.dest(config.folders.devBuildScripts));
});

gulp.task(tsks.inject.local, () => {
    log('Injecting local script and CSS references.');

    let globalsSrc = gulp.src(config.globals.file);
    let globalsOptions = {
        starttag: '<!-- inject:globals:js -->'
    };

    let configSrc = gulp.src(config.config.defaultOutput);
    let configOptions = {
        starttag: '<!-- inject:config:js -->'
    };

    let cssFiles = (config.injections.css || []).map(file => `${config.folders.devBuildStyles}${file}`);
    let cssSrc = gulp.src(cssFiles, {read: false});

    let firstJsSrc = gulp.src(config.injections.firstJs);

    let injectTask = gulp.src(config.shell)
        .pipe($.inject(globalsSrc, globalsOptions))
        .pipe($.inject(configSrc, configOptions))
        .pipe($.inject(cssSrc))
        .pipe($.inject(firstJsSrc));

    let jsSrc, jsOptions;
    config.modules.forEach(mod => {
        jsSrc = gulp.src([].concat(
            mod.jsToInject,
            config.exclude(config.injections.firstJs)
        ));
        jsOptions = {
            starttag: `<!-- inject:${mod.name}:js -->`
        };
        injectTask = injectTask
            .pipe($.inject(jsSrc, jsOptions));
    });
    injectTask = injectTask.pipe(gulp.dest(config.folders.client));
    return injectTask;
});

gulp.task('copy_static_to_dev', () => {
    log('Copying static JavaScript, CSS and style asset files to dev build folder.');

    let globalCssTask = gulp.src(config.staticFiles.css)
        .pipe(gulp.dest(config.folders.devBuildStyles));

    let jsCssTasks = config.modules.reduce((t, mod) => {
        if (!!mod.jsToCopy) {
            t.push(gulp.src(mod.jsToCopy)
                .pipe(gulp.dest(mod.jsOutputFolder))
            );
        }
        if (!!mod.cssToCopy) {
            t.push(gulp.src(mod.cssToCopy)
                .pipe(gulp.dest(config.folders.devBuildStyles))
            );
        }
        return t;
    }, []);
    let assetTasks = getStyleAssetsCopyTasks(
        config.folders.devBuildStyles,
        config.folders.devBuild,
        false
    );
    return merge(jsCssTasks.concat(assetTasks, globalCssTask));
});

////////// Distribution Build Tasks //////////

gulp.task(tsks.dist.serve, [tsks.dist.build], () => {
    serve(false);
});

gulp.task(tsks.dist.build, done => {
    log('Building the distribution deployment of the application.');

    sequence('vet',
        tsks.dist.clean,
        tsks.dev.build,
        'create_env_configs',
        'copy_to_dist',
        'inject_ng_templates',
        'optimize_build',
        'rename_rev_shell',
        'copy_webserver_configs_to_dist',
        done);
});

gulp.task(tsks.dist.clean, done => {
    clean(config.folders.distBuild, done);
});

gulp.task('create_env_configs', done => {
    if (!config.config.generateEnvs || config.config.generateEnvs.length === 0) {
        done();
        return;
    }

    log('Creating environment-specific config files.');

    let tasks = config.config.generateEnvs.map(env =>
        gulp.src(config.config.src)
            .pipe($.ngConfig(config.config.moduleName, {
                environment: env,
                createModule: false
            }))
            .pipe($.rename(`config.${env}.js`))
            .pipe(gulp.dest(config.folders.devBuildScripts))
    );
    return merge(tasks);
});

gulp.task(tsks.inject.ngTemplates, [tsks.ngTemplateCache.generate], () => {
    log('Injecting Angular templates caches')
    let task = gulp.src(config.shell)
        .pipe($.plumber());

    task = config.modules.reduce((taskResult, mod) => {
        return taskResult.pipe($.inject(
            gulp.src(`${config.folders.devBuildScripts}${mod.name}/${mod.name}-templates.js` , {read: false}), {
                starttag: `<!-- inject:${mod.name}-templates:js -->`
            }
        ));
    }, task);

    return task.pipe(gulp.dest(config.folders.client));
});

gulp.task(tsks.ngTemplateCache.generate, () => {
    log('Generating Angular template caches.');

    //TODO: Move this to gulp.config.js to control per project.
    let htmlMinOptions = {
        removeComments: true,
        collapseWhitespace: true
    };
    //TODO: Option to not minify for troubleshooting
    let tasks = config.modules.map(mod =>
        gulp.src(mod.htmls.toCache)
            .pipe($.htmlmin(htmlMinOptions))
            .pipe($.angularTemplatecache(`${mod.name}-templates.js`, {
                module: mod.name,
                standAlone: false,
                root: mod.htmls.root
            }))
            .pipe(gulp.dest(config.folders.devBuildScripts + mod.name + '/'))
    );
    return merge(tasks);
});

gulp.task('copy_to_dist', () => {
    log('Copying config, images, fonts and non-cached HTML templates to the dist folder.');
    let configCopyTask = gulp.src(config.config.generatedFiles)
        .pipe(gulp.dest(config.folders.distBuild));
    return merge(getStyleAssetsCopyTasks(
        config.folders.distBuild + 'css/',
        config.folders.distBuild,
        true).concat(configCopyTask));
});

gulp.task('optimize_build', () => {
    log('Performing optimization for dist - bundling, minification and cache busting.');

    return gulp.src(config.shell)
        .pipe($.useref({searchPath: './'}))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.csso()))
        .pipe($.rev())
        .pipe($.revReplace())
        .pipe(gulp.dest(config.folders.distBuild))
        .pipe($.rev.manifest())
        .pipe(gulp.dest(config.folders.distBuild));
});

gulp.task('rename_rev_shell', (done) => {
    let manifest = require(`${config.folders.distBuild}rev-manifest.json`);
    let revFileName = manifest['index.html'];
    if (!revFileName) {
        done();
        return;
    }

    let vinylPaths = require('vinyl-paths');
    return gulp.src(`${config.folders.distBuild}${revFileName}`)
        .pipe(vinylPaths(del))
        .pipe($.rename('index.html'))
        .pipe(gulp.dest(config.folders.distBuild));
});

gulp.task('copy_webserver_configs_to_dist', () => {
    log('Copying custom web server configurations to the dist folder.');
    let tasks = [];
    for (let webServer in config.webServerConfigs) {
        if (!config.webServerConfigs.hasOwnProperty(webServer)) {
            continue;
        }
        log(`    Found web server config for: ${webServer}`);
        let cfg = config.webServerConfigs[webServer];
        let task = gulp.src(config.folders.webserver + cfg.src)
            .pipe(gulp.dest(config.folders.distBuild + (cfg.dest || '')));
        tasks.push(task);
    }
    return merge(tasks);
});

////////// App definition file generation tasks //////////

gulp.task(tsks.definitions.generate, done => {
    log(`Generating a single Typescript definition file (${config.definitions.appFileName}) for all custom Typescript files.`);
    sequence('app_def_delete',
        'app_def_copy_template',
        'app_def_generate',
        done);
});

gulp.task('app_def_delete', done => {
    clean(config.definitions.appFile, done);
});

gulp.task('app_def_copy_template', () =>
    gulp.src(config.definitions.appTemplate)
        .pipe($.rename(config.definitions.appFileName))
        .pipe(gulp.dest(config.folders.typings))
);

gulp.task('app_def_generate', () => {
    let tsFiles = config.modules.reduce((files, mod) =>
        files.concat(mod.tsToCompile || [`${mod.folder}**/*.ts`])
    , []);
    let tsFilesSrc = gulp.src(tsFiles, {read: false});
    return gulp.src(config.definitions.appFile)
        .pipe($.inject(tsFilesSrc, {
            starttag: '//{',
            endtag: '//}',
            transform: filePath => `/// <reference path="..${filePath}" />`
        }))
        .pipe(gulp.dest(config.folders.typings));
});

////////// Serve & watch tasks and helper function //////////

gulp.task('ts_watch_handler', done => {
    sequence('compile_scripts', 'inject_custom_scripts', 'watch_handler_done', done);
});

gulp.task('less_watch_handler', done => {
    sequence('compile_styles', 'inject_custom_scripts', 'watch_handler_done', done);
});

gulp.task('config_watch_handler', done => {
    sequence('create_config', done);
});

gulp.task('watch_handler_done', done => {
    log('Changes handled! Please reload browser.', $.util.colors.bgGreen);
    done();
});

function serve(isDev) {

    function startsWith(str, checkStr) {
        if (!checkStr) {
            return true;
        }
        if (checkStr.length > str.length) {
            return false;
        }
        return str.indexOf(checkStr) === 0;
    }

    //Before serving, keep watch for changes to any Typescript or LESS files, so they are
    //automatically recompiled. This applies only to DEV mode.
    //Note: There is an issue with gulp.watch that prevents it from detecting new or deleted files
    //if the glob is absolute or starts with './'. Hence the code below to fix it.
    //See: http://stackoverflow.com/a/26851844
    if (isDev) {
        let tsToWatch = config.modules.reduce((files, mod) => {
            let fixedFiles = (mod.tsToCompile || [`${mod.folder}**/*.ts`]).map(ts => startsWith(ts, './') ? ts.substr(2) : ts);
            return files.concat(fixedFiles);
        }, []);
        gulp.watch(tsToWatch, ['ts_watch_handler']);
        // gulp.watch(tsToWatch, event => {
        //     log(`[${event.type}] ${event.path}`, $.util.colors.bgYellow);
        // });
        let lessToWatch = config.modules.reduce((files, mod) => {
            let fixedFiles = mod.lessToWatch.map(less => startsWith(less, './') ? less.substr(2) : less);
            return files.concat(fixedFiles);
        }, []);
        gulp.watch(lessToWatch, ['less_watch_handler']);
        gulp.watch(config.config.src, ['config_watch_handler']);
    }

    let open = require('open');

    //If the customHost option is specified, assume that an external web server
    //is already set-up on the config.server.customHostPort port and simply open
    //the browser on that port.
    if (customHost) {
        if (launch) {
            open('http://localhost:' + config.server.customHostPort);
        }
        return;
    }

    let nodeOptions = {
        script: config.server.entryPoint,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'dist'
        },
        watch: ['./server/server.js']
    };
    return $.nodemon(nodeOptions)
        .on('restart', ev => {
            console.log('[nodemon] Restarted ' + ev);
        })
        .on('start', () => {
            log('[nodemon] Starting on port ' + port);
            if (launch || (typeof launch !== 'undefined')) {
                if (launch === 1) {
                    open('http://localhost:' + port);
                } else if (typeof launch === 'string') {
                    open('http://localhost:' + port + launch);
                }
            } else {
                open('http://localhost:' + port);
            }

        })
        .on('crash', () => {
            log('[nodemon] Crashed')
        })
        .on('exit', () => {
            log('[nodemon] Exited cleanly')
        });
}

////////// Vetting tasks //////////

gulp.task(tsks.vet.vet, done => {
    sequence(tsks.definitions.generate,
        tsks.vet._compileTs, tsks.vet._lintTs,
        tsks.vet._compileCss,
        done);
});

gulp.task(tsks.vet._compileTs, () => {
    log('[Vet] Compiling Typescript files');
    let tsToCompile = config.modules.reduce((files, mod) => files.concat(mod.tsToCompile || [`${mod.folder}**/*.ts`]), config.definitions.all);
    let tsOptions = config.options.typescriptVet;
    tsOptions.noEmitOnError = !failOnVetError;
    return gulp.src(tsToCompile)
        .pipe($.typescript(tsOptions));
});

let tslintIndex = 0;
gulp.task(tsks.vet._lintTs, done => {
    tslintIndex = 0;
    let tasks = [];
    for (let i = 0; i < config.tslint.length; i++) {
        tasks.push(tsks.vet._lintTsCopyConfig);
        tasks.push(tsks.vet._lintTsRun);
        tasks.push(tsks.vet._lintTsIncrementCounter);
    }
    tasks.push(done);
    sequence.apply(this, tasks);
});

/* Copies the tslint file specified in config from the tools/tslint folder to the root and renames
   it to tslint.json. */
gulp.task(tsks.vet._lintTsCopyConfig, () =>
    gulp.src(config.tslint[tslintIndex].config)
        .pipe($.rename('tslint.json'))
        .pipe(gulp.dest(config.folders.root))
);

gulp.task(tsks.vet._lintTsRun, () => {
    log(config.tslint[tslintIndex].description);
    return gulp.src(config.tslint[tslintIndex].files)
        .pipe($.tslint())
        .pipe($.tslint.report('stylish', {
            emitError: failOnVetError,
            bell: true
        }))
});

gulp.task(tsks.vet._lintTsIncrementCounter, done => {
    tslintIndex += 1;
    clean(`${config.folders.root}tslint.json`, done);
});

gulp.task(tsks.vet._compileCss, () => {
    log('[Vet] Compiling LESS files');
    let lessToCompile = config.modules.reduce((files, mod) => files.concat(mod.lessToCompile), []);
    return gulp.src(lessToCompile)
        .pipe($.less());
});

gulp.task(tsks.vet._lintCss, () => {
    log('[Vet] Linting LESS files');
    let lessToLint = config.modules.reduce((files, mod) => files.concat(mod.lessToLint), []);
    return gulp.src(lessToLint)
        .pipe($.lesshint());
});

////////// Misc tasks //////////

gulp.task('clean', ['clean_dist', 'clean_dev']);

gulp.task('setup', () => {
    log('Creating GIT hooks.');
    return gulp.src('./.pre-commit')
        .pipe($.symlink('./.git/hooks/pre-commit', {force: true}));
});

////////// Helper functions //////////

function getStyleAssetsCopyTasks(cssFolder, cssParentFolder, optimizeImages) {
    let assets = config.getStyleAssets(cssFolder, cssParentFolder);
    let gulpTasks = assets.map(asset => {
        let gulpTask = gulp.src([].concat(asset.src)).pipe($.plumber());
        //TODO: Issue with image-min. Revisit.
        //if (asset.areImages && optimizeImages) {
        //    gulpTask = gulpTask.pipe($.imagemin({optimizationLevel: 4}));
        //}
        return gulpTask.pipe(gulp.dest(asset.dest));
    });
    return gulpTasks;
}

function clean(path, done) {
    log('Cleaning: ' + path);
    del(path);
    done(); //TODO: Bug with current version of del that prevents passing done as the second parameter.
}

function log(message, color) {
    if (!color) {
        color = $.util.colors.bgBlue;
    }
    if (typeof(message) === 'object') {
        for (let item in message) {
            if (message.hasOwnProperty(item)) {
                $.util.log(color(message[item]));
            }
        }
    } else {
        $.util.log(color(message));
    }
}

function gulpSrc(glob, debugTitle) {
    let task = gulp.src(glob);
    if (debug)
        task = task.pipe($.debug({title: `[${debugTitle}]`}));
    return task;
}
