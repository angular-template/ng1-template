'use strict';

module.exports = function () {
    // Root folder
    const rootFolder = './';

    // Other root folders
    const bowerFolder = rootFolder + 'bower_components/';
    const clientFolder = rootFolder + 'client/';
    const nodeModulesFolder = rootFolder + 'node_modules/';
    const serverFolder = rootFolder + 'server/';
    const toolsFolder = rootFolder + 'tools/';
    const typingsFolder = rootFolder + 'typings/';
    const webserverFolder = rootFolder + 'webserver/';

    // Client folders
    const assetsFolder = clientFolder + 'assets/';
    const modulesFolder = clientFolder + 'modules/'

    // Output folders
    const buildFolder = rootFolder + '.build/';
    const devBuildFolder = buildFolder + '.dev/';
    const devBuildScriptsFolder = devBuildFolder + 'js/';
    const devBuildStylesFolder = devBuildFolder + 'css/';
    const distBuildFolder = buildFolder + '.dist/';

    // Typescript definition files
    const appDefinitionFileName = 'app.d.ts';
    const appDefinitionFile = typingsFolder + appDefinitionFileName;
    const typescriptDefinitionFiles = [].concat(
        typingsFolder + 'lib.d.ts',
        appDefinitionFile
    );

    // Bower files
    const bowerConfig = rootFolder + 'bower.json';
    const wiredep = require('wiredep');
    const bowerJsFiles = wiredep({devDependencies: true})['js'];

    // Module definitions
    const appModule = createModule('app');
    const securityModule = createModule('security');
    const commonModule = createModule('common');
    const demoModule = createModule('demo', {
        jsToInject: [
            'layouts/**/*.js',
            '**/*.js'
        ],
        cssToCopy: [
            'layouts/sample/normalize.css',
            'layouts/sample/skeleton.css',
            'home/home.css'
        ]
    });

    //Specify modules in increasing order of dependencies.
    const modules = [commonModule, demoModule, securityModule, appModule];

    const config = {
        preferences: {
            //Whether to run a vet before the dev build.
            vetBeforeDevBuild: false
        },

        //List of modules ordered from least dependent to most.
        //The main application module should come last.
        modules: modules,

        //Common folders
        folders: {
            root: rootFolder,

            //All top-level folders
            client: clientFolder,
            bower: bowerFolder,
            nodeModules: nodeModulesFolder,
            tools: toolsFolder,
            typings: typingsFolder,
            server: serverFolder,
            webserver: webserverFolder,

            //Application assets folder
            assets: assetsFolder,

            //Build output folders
            devBuild: devBuildFolder,
            devBuildScripts: devBuildScriptsFolder,
            devBuildStyles: devBuildStylesFolder,
            distBuild: distBuildFolder,
        },


        //Path to the shell file.
        shell: clientFolder + 'index.html',

        staticFiles: {
            css: [],
            js: []
        },

        //Special injections into the shell file that are independent of modules.
        injections: {
            //All CSS to be injected in the correct order.
            //This includes compiled LESS, CSS from bower_components and 3rd-party CSS from the assets folder.
            css: [
                devBuildStylesFolder + 'styles.css',
                devBuildStylesFolder + '**/*.css'
            ],

            //Application script files that must be injected before all other scripts (except bower scripts).
            //Typically, these include module registrations and configurations.
            //Note: Do not include the environment config file that is generated from config.json.
            //      This is handled separately.
            //Note: Order is important here. Typically modules come first, followed by config.
            firstJs: [].concat(
                modules.reduce((files, mod) => {
                    files.unshift(`${devBuildScriptsFolder}${mod.name}/config/*.js`);
                    files.unshift(`${devBuildScriptsFolder}${mod.name}/${mod.name}.module.js`);
                    return files;
                }, [])
            ),
        },

        globals: {
            file: `${devBuildScriptsFolder}globals.js`,
            appComponentPrefix: 'app',
            sharedComponentPrefix: 'shared',
            appPrefix: undefined
        },

        //Environment-specific config handling
        config: {
            //Path to the environment-specific config data.
            src: clientFolder + 'config.json',

            //Path to generated script file for the config.
            defaultOutput: devBuildScriptsFolder + 'config.js',

            //Environment-specific config is generated as an AngularJS constants service.
            //<moduleName> specifies the name of the module under which to create the service.
            //Typically, this will be the main module.
            moduleName: modules[modules.length - 1].name,

            //Environment to use to generate the config script file if one is not specified.
            defaultEnv: 'local',

            //List of additional environments to create config scripts for during a dist build.
            //These additional config files will be named 'config.<env>.js'.
            //Useful for when we want to redeploy the app without having to run the Gulp tasks each time.
            generateEnvs: ['dev', 'qa', 'uat', 'prod'],

            googleIds: {
                dev: '',
                qa: ''
            },

            //Path to the additional config files.
            generatedFiles: devBuildScriptsFolder + 'config*.js'
        },

        //Typescript definition file config
        definitions: {
            //File name of the definition file for application files.
            appFileName: appDefinitionFileName,

            //Path to the definition file for application files.
            appFile: appDefinitionFile,

            //Empty template of the definition file for application files.
            //Contains only the necessary placeholders for the injector.
            appTemplate: typingsFolder + 'app.d.ts.template',

            //List of all definition files (application, bower, etc.)
            all: typescriptDefinitionFiles
        },

        tslint: [
            {
                description: 'Default rules',
                config: toolsFolder + 'tslint/tslint.json',
                files: modules
                    .reduce((files, mod) => files.concat(mod.tsToCompile || `${mod.folder}**/*.ts`), [])
            }
        ],

        webServerConfigs: {
            iis: {
                src: 'web.config'
            },
            apache: {
                src: '.htaccess'
            },
            tomcat: {
                src: 'WEB-INF/**/*.*',
                dest: 'WEB-INF/'
            }
        },

        //Options for various Gulp and NPM plug-ins used for this build.
        options: {
            //Wiredep options for injecting Bower scripts.
            //See https://www.npmjs.com/package/wiredep for docs.
            wiredep: {
                bowerJson: require(bowerConfig),
                ignorePath: '../',
                exclude: []
            },

            //Typescript compiler options during the dev build.
            //See https://www.npmjs.com/package/typescript for docs.
            typescriptBuild: {
                target: 'ES5',
                declarationFiles: false,
                noExternalResolve: false
            },

            //Typescript compiler options during the vet stage.
            //See https://www.npmjs.com/package/typescript for docs.
            typescriptVet: {
                target: 'ES5',
                declarationFiles: false,
                noExternalResolve: false
            }
        },

        bower: {
            jsFiles: bowerJsFiles
        },

        // Configuration for the Node.js server
        server: {
            entryPoint: serverFolder + 'server.js',
            watch: serverFolder,
            nodeHostPort: 7709,
            customHostPort: 7710
        },
    };

    //Reusable function to retrieve details of all style asset files in the project.
    //Used for both DEV and DIST builds.
    //cssFolder and cssParentFolder represent the build folder where all styles are placed
    //and its parent folder, respectively.
    //If areImages is true, then the images are optimized during a DIST build.
    config.getStyleAssets = (cssFolder, cssParentFolder) => [
        {
            src: bowerFolder + 'bootstrap/dist/fonts/**/*.*',
            dest: cssParentFolder + 'fonts/',
            areImages: false
        },
        {
            src: bowerFolder + 'font-awesome/fonts/**/*.*',
            dest: cssParentFolder + 'fonts/',
            areImages: false
        },
        {
            src: assetsFolder + 'images/**/*.*',
            dest: cssParentFolder + 'images/',
            areImages: true
        },
        {
            src: config.folders.assets + 'fonts/*',
            dest: cssParentFolder + 'fonts/',
            areImages: false
        }
    ];

    /**
     * Accepts a glob and marks it as excluded by prepending it with a bang symbol.
     * @param glob The string or string array that represents the glob
     */
    function exclude(glob) {
        if (typeof glob === 'string') {
            return '!' + glob;
        }
        return glob.map(function(g) {
            return '!' + g;
        });
    }

    function excludeSpecs(glob) {
        if (typeof glob === 'string') {
            return [glob, exclude(glob.replace('.ts','.spec.ts'))]
        }
        return glob.reduce(function(prev, next) {
            prev.push(next)
            prev.push(exclude(next.replace('.ts', '.spec.ts')));
            return prev;
        }, []);
    }

    config.exclude = exclude;
    config.excludeSpecs = excludeSpecs;

    function createModule(moduleName, options) {
        function assignDefaults(name, opts) {
            //Base source folder for the module
            opts.folder = opts.folder || name;

            //List of all Typescript files to compile.
            opts.tsToCompile = opts.tsToCompile || ['**/*.ts'];
            //Additional JavaScript files to copy to the output folder.
            opts.jsToCopy = opts.jsToCopy || [];
            //Folder where the Typescript files are compiled to and the additional JavaScript files are copied to.
            opts.jsOutputFolder = opts.jsOutputFolder || name;
            //All the JavaScript files from the output folder to inject into the shell HTML, in the correct order.
            opts.jsToInject = opts.jsToInject || ['**/*.js'];
            //List of JavaScript files to inject before any other scripts.
            opts.firstInjectJs = opts.firstInjectJs || [
                `${name}.module.js`,
                `config/*.config.js`
            ],

            opts.lessToCompile = opts.lessToCompile || [];
            opts.lessToLint = opts.lessToLint || ['**/*.less'];
            opts.lessToWatch = opts.lessToWatch || ['**/*.ts'];
            opts.cssToCopy = opts.cssToCopy || [];

            opts.htmls = opts.htmls || {
                all: '**/*.html',
                root: `/client/modules/${name}`,
                toCache: '**/*.html'
            };

            return opts;
        }

        function prefixAll(list, prefix) {
            return list.map((item, index, array) => prefix + item);
        }

        function makeFolder(folder) {
            return folder[folder.length - 1] === '/' ? folder : folder + '/';
        }

        function makeAbsolutePaths(name, opts) {
            opts.folder = makeFolder(`${modulesFolder}${opts.folder}`);

            opts.tsToCompile = prefixAll(opts.tsToCompile, opts.folder);
            //TODO: opts.jsToCopy
            opts.jsOutputFolder = makeFolder(`${devBuildScriptsFolder}${opts.jsOutputFolder}/`);
            opts.jsToInject = prefixAll(opts.jsToInject, opts.jsOutputFolder);
            opts.firstInjectJs = prefixAll(opts.firstInjectJs, opts.jsOutputFolder);

            opts.lessToCompile = prefixAll(opts.lessToCompile, opts.folder);
            opts.lessToLint = prefixAll(opts.lessToLint, opts.folder);
            opts.lessToWatch = prefixAll(opts.lessToWatch, opts.folder);
            opts.cssToCopy = prefixAll(opts.cssToCopy, opts.folder);

            opts.htmls.all = `${opts.folder}${opts.htmls.all}`;
            opts.htmls.toCache = `${opts.folder}${opts.htmls.toCache}`;

            return opts;
        }

        options = options || {};
        options.name = moduleName;
        options = assignDefaults(moduleName, options);
        options = makeAbsolutePaths(moduleName, options);
        return options;
    }

    return config;
};
