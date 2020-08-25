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
        var config = path_1.join(this.bud.project('stylelint.config.js'));
        if (!this.bud.fs.existsSync(config)) {
            return;
        }
        this.bud.apply('stylelint', api_1["default"]);
        this.bud.configs.set('stylelint', config);
        this.bud.features.set('stylelint', true);
        this.bud.plugins.push(adapter_1["default"]);
    }
}); };
exports.stylelint = stylelint;
var preset = {
    roots: path_1.resolve(__dirname, './preset/index.js')
};
exports.preset = preset;
//# sourceMappingURL=index.js.map