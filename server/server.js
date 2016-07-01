'use strict';

var express = require('express');
var compression = require('compression');
var config = require('../gulp.config.js')();

var app = express();

var port = process.env.PORT || config.server.nodeHostPort;
var environment = process.env.NODE_ENV || 'dev';

var staticOptions = {
    fallthrough: false
};

if (environment === 'dev') {
    app.use('/bower_components',
        express.static('./bower_components/', staticOptions));
    app.use('/images',
        express.static('./.build/.dev/images/', staticOptions));
    //Note: we're specifying specific folders under /client because we do
    //not want to expose certain subfolders such as assets (the correct
    //location would be under the .dev folder) and utils.
    for (var i = 0; i < config.modules.length; i++) {
        app.use('/client/modules/' + config.modules[i].name,
            express.static('./client/modules/' + config.modules[i].name + '/', staticOptions));
    }
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
