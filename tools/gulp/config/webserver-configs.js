'use strict';

module.exports = {
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
