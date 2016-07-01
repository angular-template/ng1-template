/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace common.config {
    /**
     * Environment-specific configurations for the entire application.
     * The values are specified in the config.json file at the /client folder.
     */
    export interface IConfig {
        apiBaseUrl: string;
    }
}
