//TODO: Change any configuration that iterates through modules to use a delegate.

let config = {};

// Folders
config.folders = require('./core.folders');

// Preferences
config.preferences = require('./preferences');

// Modules
let modules = require('./modules');
config.modules = modules.modules;
config.coreDependencies = modules.coreDependencies;

// Path to the shell file
config.shell = `${config.folders.client}index.html`;

// Temporary
config.staticFiles = {
    css: [],
    js: []
};
config.injections = {};
config.injections.css = require('./styles').injections;
config.injections.firstJs = [].concat(
    modules.modules.reduce((files, mod) => {
        files.unshift(`${config.folders.devBuildScripts}${mod.name}/config/*.js`);
        files.unshift(`${config.folders.devBuildScripts}${mod.name}/${mod.name}.module.js`);
        files.unshift(`${config.folders.devBuildScripts}app.js`);
        return files;
    }, [])
);

// Styles
config.styles = require('./styles');

// Environment-specific config handling
config.config = {
    //Path to the environment-specific config data.
    src: `${config.folders.client}config.json`,

    //Path to generated script file for the config.
    defaultOutput: `${config.folders.devBuildScripts}config.js`,

    //Environment-specific config is generated as an AngularJS constants service.
    //<moduleName> specifies the name of the module under which to create the service.
    //Typically, this will be the main module.
    moduleName: 'common',

    //Environment to use to generate the config script file if one is not specified.
    defaultEnv: 'local',

    //List of additional environments to create config scripts for during a dist build.
    //These additional config files will be named 'config.<env>.js'.
    //Useful for when we want to redeploy the app without having to run the Gulp tasks each time.
    generateEnvs: ['dev', 'qa', 'uat', 'prod'],

    //Path to the additional config files.
    generatedFiles: `${config.folders.devBuildScripts}/config*.js`
};

// Typescript definition file config
const appTypingsFileName = 'app.d.ts';
const appTypingsFile = `${config.folders.typings}appTypingsFileName`;
const typingFiles = [
    `${config.folders.typings}index.d.ts`,
    appTypingsFile
];
//TODO: Change name to typings
config.definitions = {
    //File name of the definition file for application files.
    appFileName: appTypingsFileName,

    //Path to the definition file for application files.
    appFile: appTypingsFile,

    //Empty template of the definition file for application files.
    //Contains only the necessary placeholders for the injector.
    appTemplate: `${config.folders.tools}app-typings/app.d.ts.template`,

    //List of all definition files (application, bower, etc.)
    all: typingFiles
};

// TSLint config settings
//TODO: Change files to a delegate that accepts the module
config.tslint = [
    {
        description: 'Default rules',
        config: `${config.folders.tools}tslint/tslint.json`,
        files: config.modules
            .reduce((files, mod) => files.concat(mod.tsToCompile || `${mod.folder}**/*.ts`), [])
    }
];

// Web server configs
config.webServerConfigs = {
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
};

// NPM and Gulp package options
config.options = require('./npm-options');

// Bower
//TODO: Refactor
config.bower = {
    jsFiles: require('wiredep')({ devDependencies: true })['js']
};

// Server
config.server = require('./dev-server');

//TODO: Temporary or refactor
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

module.exports = config;
