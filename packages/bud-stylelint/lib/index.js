"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.preset = exports.stylelint = void 0;
var path_1 = require("path");
var adapter_1 = __importDefault(require("./adapter"));
var api_1 = __importDefault(require("./api"));
/**
 * Bud extension: Stylelint support.
 */
var stylelint = function (bud) { return ({
    bud: bud,
    name: 'stylelint',
    make: function () {
        /**
         * Load .stylelintrc.js and bail early if not found.
         */
        var config = path_1.join(this.bud.project('stylelint.config.js'));
        if (!this.bud.fs.existsSync(config)) {
            return;
        }
        /**
         * Set bud.stylelint API method.
         */
        this.bud.apply('stylelint', api_1["default"]);
        /**
         * Set stylelint to config container
         */
        this.bud.configs.set('stylelint', config);
        /**
         * Enable stylelint support
         */
        this.bud.features.set('stylelint', true);
        /**
         * Add stylelint webpack adapter
         */
        this.bud.adapters.add(adapter_1["default"]);
    }
}); };
exports.stylelint = stylelint;
var preset = {
    roots: path_1.resolve(__dirname, './preset/index.js')
};
exports.preset = preset;
//# sourceMappingURL=index.js.map