'use strict';

module.exports = {
    help: 'help',
    default: 'default',
    definitions: {
        generate: 'generate-app-typings',
        deleteFile: 'typings:delete_file',
        copyTemplate: 'typings:copy_template',
        inject: 'typings:inject'
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
        deleteFile: 'shell:delete_file',
        copyTemplate: 'shell:copy_template'
    },
    vet: {
        vet: 'vet',
        _compileTs: 'vet:compile_ts',
        _lintTs: 'vet:lint_ts',
        _lintTsCopyConfig: 'vet:lint_ts_copy_config',
        _lintTsRun: 'vet:lint_ts_run_lint',
        _lintTsIncrementCounter: 'vet:lint_ts_increment_counter',
        _compileLess: 'vet:compile_less',
        _lintLess: 'vet:lint_less'
    }
};
