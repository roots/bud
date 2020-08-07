"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preset = exports.stylelint = void 0;
const path_1 = require("path");
const adapter_1 = __importDefault(require("./adapter"));
/**
 * Bud extension: Stylelint support.
 */
const stylelint = () => ({
    make: function () {
        /**
         * Load .stylelintrc.js and bail early if not found.
         */
        const config = path_1.join(this.bud.project('stylelint.config.js'));
        if (!this.bud.fs.existsSync(config)) {
            return;
        }
        /**
         * Set bud.stylelint API method.
         */
        this.bud.stylelint = config;
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
        this.bud.adapters.add(adapter_1.default);
    },
});
exports.stylelint = stylelint;
const preset = {
    roots: path_1.resolve(__dirname, './preset/index.js'),
};
exports.preset = preset;
//# sourceMappingURL=index.js.map