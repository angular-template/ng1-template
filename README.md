## Angular 1.5 Starter Template
Starter template for large enterprise Angular applications using Typescript. The template features:
* New component-based UI from Angular 1.5.
* Routing using the angular-ui-router framework.
* Gulp scripts for dev and production builds, code vetting, unit tests and development workflow.
* Support for multiple environment (dev, qa, prod, etc.) configurations.
* Modular structure using folder conventions
* Git pre-commit hooks to vet code before every commit.

### Continuous builds on Travis CI
| Branch | Status |
| ------ | ------ |
| master | [![Build Status](https://travis-ci.org/angular-template/ng1-template.svg?branch=master)](https://travis-ci.org/angular-template/ng1-template) |
| develop | [![Build Status](https://travis-ci.org/angular-template/ng1-template.svg?branch=develop)](https://travis-ci.org/angular-template/ng1-template) |

[Live Demo Site](https://ng1-template.firebaseapp.com/)

### Quick start
Ensure you have Gulp, Bower and Typings installed globally
```shell
npm install -g gulp bower typings
```

Clone or fork the repository, then run the following from the root folder to setup local dependencies:
```shell
npm install
```

Run the application using Gulp
```shell
gulp
```

### Further reading
* [Development Environment](https://github.com/angular-template/docs/wiki/Development-Environment): Details on system prerequisites, setting up your development environment and dealing with common issues.
* [Full Documentation](https://github.com/angular-template/ng1-template/wiki): Project wiki containing the full documentation.
