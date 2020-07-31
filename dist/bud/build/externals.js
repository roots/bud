"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.externals = void 0;
var webpack_node_externals_1 = __importDefault(require("webpack-node-externals"));
/**
 * Webpack externals
 */
var externals = function (bud) { return ({
    bud: bud,
    options: {},
    make: function () {
        /**
         * Set externals from bud.state.
         */
        var externalsState = this.bud.state.options.get('externals');
        if (externalsState) {
            this.options.externals = externalsState;
        }
        /**
         * When targeting node we don't want to incorporate
         * modules in the build.
         */
        if (this.bud.state.options.get('target') == 'node') {
            this.options.externals = [webpack_node_externals_1["default"]()];
        }
        return this.options;
    }
}); };
exports.externals = externals;
//# sourceMappingURL=externals.js.map