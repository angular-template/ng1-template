'use strict';

let express = require('express');
let compression = require('compression');

let ng1TemplateGulp = require('ng1-template-gulp');
let config = ng1TemplateGulp.config;
let server = config.server;
let modules = config.modules;

let app = express();

let port = process.env.PORT || server.nodeHostPort;
let environment = process.env.NODE_ENV || 'dev';

let staticOptions = {
    fallthrough: false
};

if (environment === 'dev') {
    app.use('/bower_components',
        express.static('./bower_components/', staticOptions));
    app.use('/images',
        express.static('./.build/.dev/images/', staticOptions));
    app.use('/client',
        express.static('./client/', staticOptions));
    app.use('/.build/.dev',
        express.static('./.build/.dev/', staticOptions));
    app.get('/**', function(req, res) {
        res.sendFile('index.html', {
            root: './client/'
        });
    });
} else if (environment === 'dist') {
    staticOptions.maxAge = 2592000000;
    app.use(compression());
    app.use('/client',
        express.static('./.build/.dist/client/', staticOptions));
    app.use('/js',
        express.static('./.build/.dist/js/', staticOptions));
    app.use('/css',
        express.static('./.build/.dist/css/', staticOptions));
    app.use('/images',
        express.static('./.build/.dist/images/', staticOptions));
    app.use('/fonts',
        express.static('./.build/.dist/fonts/', staticOptions));
    app.get('/**', function(req, res) {
        res.sendFile('index.html', {
            root: './.build/.dist/'
        });
    });
}

app.listen(port);
