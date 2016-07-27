'use strict';

let gulp = require('gulp');

let config = require('./tools/gulp/config');
let utils = require('./tools/gulp/tasks/utils');
let tsks = require('./tools/gulp/tasks/task-names');

let args = require('yargs').argv;
let sequence = require('run-sequence');
let merge = require('merge2');
let _ = require('lodash');

let $ = require('gulp-load-plugins')({lazy: true});

let port = process.env.PORT || config.server.nodeHostPort;
let environment = args.env || config.config.defaultEnv;
let launch = args.launch;
let customHost = args.customHost;

let requireDir = require('require-dir');
requireDir('./tools/gulp/tasks', { recurse: true } );

////////// Dev Build Tasks //////////

gulp.task(tsks.dev.serve, [tsks.dev.build], () => {
    serve(true);
});

gulp.task(tsks.dev.build, done => {
    let tasks = [
        tsks.dev.clean,
        tsks.shell.generate,
        [tsks.inject.vendor, 'compile_scripts'],
        'handle_styles',
        'create_config',
        [tsks.inject.local, 'copy_static_to_dev'],
        done
    ];
    if (config.preferences.vetBeforeDevBuild) {
        tasks.unshift(tsks.vet.vet);
    }
    sequence.apply(this, tasks);
});

gulp.task(tsks.dev.clean, done => {
    utils.clean(config.folders.devBuild, done);
});

gulp.task('generate_modules', done => {
    const fs = require('fs');
    const os = require('os');

    for (let i = 0; i < config.modules.length; i++) {
        let moduleCode = buildModuleCode(config.modules, i)
            .concat('')
            .join(os.EOL);
        let name = config.modules[i].name;
        fs.writeFileSync(`${config.folders.modules}${name}/${name}.module.ts`, moduleCode);
    }

    done();
});

function buildModuleCode(modules, index) {
    let module = modules[index];
    let code = [
        `// tslint:disable`,
        `namespace ${module.ns || module.name} {`,
        `    import core = ng1Template.core;`,
        ``,
        `    export const ${module.name}Module: ng.IModule = angular.module('${module.name}', [`
    ];
    for (let i = index - 1; i >= 0; i--) {
        code.push(`        '${modules[i].name}',`);
    }
    for (let i = 0; i < (config.coreDependencies.length || []); i++) {
        code.push(`        '${config.coreDependencies[i]}',`);
    }
    if (module.dependencies && module.dependencies.length) {
        for (let i = 0; i < module.dependencies.length; i++) {
            code.push(`        '${module.dependencies[i]}',`);
        }
    }
    code = code.concat([
        `    ]);`,
        ``,
        `    export let Component: core.ComponentDecoratorFactory = (`,
        `        details: core.IComponentDetails, route?: core.IComponentRoute`,
        `    ): core.ClassDecorator => {`,
        `        return (target: Function): void => {`,
        `            core.registerComponent({`,
        `                name: details.selector,`,
        `                controller: target,`,
        `                templateUrl: details.templateUrl,`,
        `                templateUrlRoot: details.templateUrlRoot,`,
        `                route: route`,
        `            }, ${module.name}Module);`,
        `        };`,
        `    };`,
        ``,
        `    export let Layout: core.LayoutDecoratorFactory = (details: core.ILayoutDetails): core.ClassDecorator => {`,
        `        return (target: Function): void => {`,
        `            core.registerLayout({`,
        `                name: details.name,`,
        `                controller: target,`,
        `                templateUrl: details.templateUrl,`,
        `                templateUrlRoot: details.templateUrlRoot`,
        `            }, ${module.name}Module);`,
        `        };`,
        `    };`,
        ``,
        `    export let Injectable: core.ServiceDecoratorFactory = (name: string): core.ClassDecorator => {`,
        `        return (target: Function): void => {`,
        `            core.registerService({`,
        `                name: name,`,
        `                service: target,`,
        `                module: ${module.name}Module`,
        `            });`,
        `        };`,
        `    };`,
        `}`
    ]);
    return code;
}

gulp.task(tsks.inject.vendor, () => {
    utils.log('Wiring up Bower script dependencies.');

    let wiredep = require('wiredep').stream;
    return gulp.src(config.shell.file)
        .pipe(wiredep(config.options.wiredep))
        .pipe(gulp.dest(config.folders.client))
});

gulp.task('compile_scripts', ['generate_modules', tsks.definitions.generate], () => {
    utils.log('Transpiling Typescript code to JavaScript');

    let filesToCompile = [].concat(
        config.definitions.all,
        `${config.folders.modules}**/*.ts`
    );
    let compileTask = utils.src(filesToCompile, 'script-compile')
        .pipe($.typescript(config.options.typescriptBuild));
    return compileTask.js
        .pipe($.ngAnnotate())
        .pipe($.stripLine(`/// <reference path="`))
        .pipe(gulp.dest(config.folders.devBuildScripts));
});

gulp.task('handle_styles', done => {
    utils.log('Handling styles for the application.');

    if (!config.styles.usesLess && !config.styles.usesSass) {
        done();
        return;
    }

    let tasks = [];
    if (config.styles.usesLess) {
        tasks.push('styles:compile_less');
    }
    if (config.styles.usesSass) {
        tasks.push('styles:compile_sass');
    }
    tasks.push(done);
    sequence.apply(this, tasks);
});

gulp.task('styles:compile_less', done => {
    utils.log2('Compiling LESS files to CSS stylesheets');

    let lessFiles = config.modules.reduce(
        (files, mod) => files.concat(mod.styles.less || []),
        config.styles.less || []
    );
    if (lessFiles.length === 0) {
        done();
    }
    return utils.src(lessFiles, 'compile-less')
        .pipe($.less())
        .pipe(gulp.dest(config.folders.devBuildStyles));
});

gulp.task('styles:compile_sass', done => {
    utils.log2('Compiling SASS files to CSS stylesheets');
    throw new Error('SASS support not yet available.');
});

gulp.task('create_config', () => {
    utils.log('Generating AngularJS constants file to store environment-specific configuration.');

    return utils.src(config.config.src)
        .pipe($.ngConfig(config.config.moduleName, {
            environment: environment,
            createModule: false
        }))
        .pipe(gulp.dest(config.folders.devBuildScripts));
});

gulp.task(tsks.inject.local, () => {
    utils.log('Injecting local script and CSS references.');

    let configSrc = gulp.src(config.config.defaultOutput);
    let configOptions = {
        starttag: '<!-- inject:config:js -->'
    };

    let cssFiles = config.styles.injections || [];
    let cssSrc = gulp.src(cssFiles, {read: false});

    let firstJsSrc = gulp.src(config.injections.firstJs);

    let injectTask = utils.src(config.shell.file, 'local-inject')
        .pipe($.inject(configSrc, configOptions))
        .pipe($.inject(cssSrc))
        .pipe($.inject(firstJsSrc));

    let jsSrc, jsOptions;
    config.modules.forEach(mod => {
        jsSrc = gulp.src([].concat(
            mod.jsToInject,
            utils.exclude(config.injections.firstJs)
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
    utils.log('Copying static JavaScript, CSS and style asset files to dev build folder.');

    let jsCssTasks = config.modules.reduce((t, mod) => {
        if (!!mod.jsToCopy) {
            t.push(utils.src(mod.jsToCopy, 'static-assets')
                .pipe(gulp.dest(mod.jsOutputFolder))
            );
        }
        return t;
    }, []);
    let assetTasks = getStyleAssetsCopyTasks(
        config.folders.devBuildStyles,
        config.folders.devBuild,
        false
    );
    return merge(jsCssTasks.concat(assetTasks));
});

////////// Distribution Build Tasks //////////

gulp.task(tsks.dist.serve, [tsks.dist.build], () => {
    serve(false);
});

gulp.task(tsks.dist.build, done => {
    utils.log('Building the distribution deployment of the application.');

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
    utils.clean(config.folders.distBuild, done);
});

gulp.task('create_env_configs', done => {
    if (!config.config.generateEnvs || config.config.generateEnvs.length === 0) {
        done();
        return;
    }

    utils.log('Creating environment-specific config files.');

    let tasks = config.config.generateEnvs.map(env =>
        utils.src(config.config.src, 'env-config')
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
    utils.log('Injecting Angular templates caches')
    let task = utils.src(config.shell.file, 'ng-templates');

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
    utils.log('Generating Angular template caches.');

    //TODO: Option to not minify for troubleshooting
    let tasks = config.modules.map(mod =>
        utils.src(mod.htmls.toCache, 'template-cache')
            .pipe($.htmlmin(config.options.htmlMin))
            .pipe($.angularTemplatecache(`${mod.name}-templates.js`, {
                module: mod.name,
                standAlone: false,
                root: mod.htmls.root
            }))
            .pipe(gulp.dest(`${config.folders.devBuildScripts}${mod.name}/`))
    );
    return merge(tasks);
});

gulp.task('copy_to_dist', () => {
    utils.log('Copying config, images, fonts and non-cached HTML templates to the dist folder.');
    let configCopyTask = utils.src(config.config.generatedFiles, 'copy-to-dist')
        .pipe(gulp.dest(config.folders.distBuild));
    return merge(getStyleAssetsCopyTasks(
        config.folders.distBuild + 'css/',
        config.folders.distBuild,
        true).concat(configCopyTask));
});

gulp.task('optimize_build', () => {
    utils.log('Performing optimization for dist - bundling, minification and cache busting.');

    return utils.src(config.shell.file, 'optimize')
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
    let del = require('del');
    return gulp.src(`${config.folders.distBuild}${revFileName}`)
        .pipe(vinylPaths(del))
        .pipe($.rename('index.html'))
        .pipe(gulp.dest(config.folders.distBuild));
});

gulp.task('copy_webserver_configs_to_dist', () => {
    utils.log('Copying custom web server configurations to the dist folder.');
    let tasks = [];
    for (let webServer in config.webServerConfigs) {
        if (!config.webServerConfigs.hasOwnProperty(webServer)) {
            continue;
        }
        utils.log(`    Found web server config for: ${webServer}`);
        let cfg = config.webServerConfigs[webServer];
        let task = gulp.src(config.folders.webserver + cfg.src)
            .pipe(gulp.dest(config.folders.distBuild + (cfg.dest || '')));
        tasks.push(task);
    }
    return merge(tasks);
});

////////// Serve & watch tasks and helper function //////////

gulp.task('watch:ts_handler', done => {
    sequence('compile_scripts', 'inject_custom_scripts', 'watch_handler_done', done);
});

gulp.task('watch:css_handler', done => {
    sequence('inject_custom_scripts', 'watch_handler_done', done);
});

gulp.task('watch:less_handler', done => {
    sequence('handle_styles', 'inject_custom_scripts', 'watch_handler_done', done);
});

gulp.task('watch:config_handler', done => {
    sequence('create_config', done);
});

gulp.task('watch:handler_done', done => {
    utils.log('Changes handled! Please reload browser.', $.util.colors.white.bgGreen);
    done();
});

function serve(isDev) {
    //Before serving, keep watch for changes to any Typescript or LESS files, so they are
    //automatically recompiled. This applies only to DEV mode.
    //Note: There is an issue with gulp.watch that prevents it from detecting new or deleted files
    //if the glob is absolute or starts with './'. Hence the code below to fix it.
    //See: http://stackoverflow.com/a/26851844
    if (isDev) {
        function fixPaths(paths) {
            return paths.map(path => _.startsWith(path, './') ? path.substr(2) : path);
        }

        function logChanges(watcher) {
            watcher.on('change', ev => {
                utils.log(`[${ev.type}] ${ev.path}`, $.util.colors.blue.bgWhite);
            });
        }

        let tsToWatch = fixPaths([].concat(
            config.definitions.all,
            `${config.modules}**/*.ts`
        ));
        let tsWatcher = gulp.watch(tsToWatch, ['watch:ts_handler']);
        logChanges(tsWatcher);

        let cssToWatch = fixPaths([].concat(
            `${config.folders.assets}**/*.css`,
            `${config.folders.modules}**/*.css`
        ));
        let cssWatcher = gulp.watch(cssToWatch, ['watch:css_handler']);
        logChanges(cssWatcher);

        if (config.styles.usesLess) {
            let lessToWatch = fixPaths([
                `${config.folders.assets}**/*.less`,
                `${config.folders.modules}**/*.less`
            ]);
            let lessWatcher = gulp.watch(lessToWatch, ['watch:less_handler']);
            logChanges(lessWatcher);
        }

        if (config.styles.usesSass) {
            //TODO: Handle SASS
        }

        let configWatcher = gulp.watch(config.config.src, ['watch:config_handler']);
        logChanges(configWatcher);
    }

    let open = require('open');

    //If the customHost option is specified, assume that an external web server
    //is already set-up on the config.server.customHostPort port and simply open
    //the browser on that port.
    if (customHost) {
        if (launch) {
            open(`http://localhost:${config.server.customHostPort}`);
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
        .on('restart', () => {
            console.log('[nodemon] Restarted');
        })
        .on('start', () => {
            utils.log(`[nodemon] Starting on port ${port}`);
            if (launch || (typeof launch !== 'undefined')) {
                if (launch === 1) {
                    open(`http://localhost:${port}`);
                } else if (typeof launch === 'string') {
                    open(`http://localhost:${port}${launch}`);
                }
            } else {
                open(`http://localhost:${port}`);
            }

        })
        .on('crash', () => {
            utils.log('[nodemon] Crashed')
        })
        .on('exit', () => {
            utils.log('[nodemon] Exited cleanly')
        });
}

////////// Helper functions //////////

function getStyleAssetsCopyTasks(cssFolder, cssParentFolder, optimizeImages) {
    let assets = config.getStyleAssets(cssFolder, cssParentFolder);
    let gulpTasks = assets.map(asset => {
        let gulpTask = utils.src([].concat(asset.src), 'style-assets');
        //TODO: Issue with image-min. Revisit.
        //if (asset.areImages && optimizeImages) {
        //    gulpTask = gulpTask.pipe($.imagemin({optimizationLevel: 4}));
        //}
        return gulpTask.pipe(gulp.dest(asset.dest));
    });
    return gulpTasks;
}
