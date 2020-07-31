"use strict";
exports.__esModule = true;
exports.state = void 0;
var configs_1 = require("./configs");
var features_1 = require("./features");
var options_1 = require("./options");
var paths_1 = require("./paths");
var env_1 = require("./env");
var plugins_1 = require("./plugins");
var flags_1 = require("./flags");
/**
 * bud.state
 */
exports.state = function (bud) {
    var container = {
        paths: paths_1.paths,
        configs: configs_1.configs,
        flags: flags_1.flags,
        env: env_1.env,
        features: features_1.features,
        options: options_1.options,
        plugins: plugins_1.plugins,
        init: function (bud) {
            this.env = env_1.env(this);
            this.configs = configs_1.configs(this.paths);
            this.features = features_1.features(this);
            this.options = options_1.options(this);
            this.plugins = plugins_1.plugins(this);
            return this;
        }
    };
    var state = container.init(bud);
    return state;
};
//# sourceMappingURL=index.js.map