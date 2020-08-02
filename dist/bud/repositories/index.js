"use strict";
exports.__esModule = true;
exports.repositories = void 0;
var configs_1 = require("./configs");
var features_1 = require("./features");
var options_1 = require("./options");
var paths_1 = require("./paths");
var cli_1 = require("./cli");
var env_1 = require("./env");
var plugins_1 = require("./plugins");
exports.repositories = {
    configs: configs_1.configs,
    features: features_1.features,
    options: options_1.options,
    paths: paths_1.paths,
    cli: cli_1.cli,
    env: env_1.env,
    adapters: plugins_1.adapters,
    plugins: plugins_1.plugins
};
//# sourceMappingURL=index.js.map