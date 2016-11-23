'use strict';

const api = {
    url: 'http://petstore.swagger.io/v2/swagger.json',
    output: './client/modules/common/webservices/__api.services.ts',
    generator: 'ng1-http',
    language: 'typescript',
    debug: {
        definition: './.build/api.definition.json'
    },
    transforms: {
        serviceName: 'pascalCase',
        operationName: 'camelCase'
    },
    options: {
        moduleName: 'common',
        baseUrl: {
            provider: 'app.IConfig',
            variable: 'config',
            path: ['apiBaseUrl']
        },
        namespaces: {
            services: 'common.webservices',
            models: 'common.webservices.models'
        },
        references: [
            '../../../../typings/index.d.ts',
            '../../../../typings/app.d.ts'
        ]
    }
};

module.exports = {
    api: api
};
