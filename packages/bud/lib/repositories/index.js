"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.repositories = void 0;
var plugins_1 = require("./plugins");
var cli_1 = require("./cli");
var configs_1 = require("./configs");
var env_1 = require("./env");
var features_1 = require("./features");
var options_1 = require("./options");
var paths_1 = require("./paths");
var patterns_1 = require("./patterns");
var rulesets_1 = require("./rulesets");
/**
 * Repositories
 */
exports.repositories = {
    plugins: [plugins_1.plugins],
    files: [configs_1.configs],
    stores: __spreadArrays([
        features_1.features,
        rulesets_1.loaders,
        options_1.options,
        paths_1.paths,
        patterns_1.patterns,
        rulesets_1.rules,
        rulesets_1.uses,
        env_1.env
    ], cli_1.cli)
};
//# sourceMappingURL=index.js.map