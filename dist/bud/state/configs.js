"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.configs = void 0;
var path_1 = require("path");
var fs_extra_1 = require("fs-extra");
var paths_1 = require("./paths");
var config = function (file) { return path_1.join(paths_1.paths.project, file); };
/**
 * ## bud.state.configs
 */
var configs = {
    repository: {},
    contents: function (config) {
        return require(this.get(config));
    },
    get: function (config) {
        return this.repository[config];
    },
    add: function (name, file) {
        var _a;
        this.repository = __assign(__assign({}, this.repository), (_a = {}, _a[name] = file, _a));
    },
    has: function (config) {
        return this.repository[config] && this.repository[config] !== null;
    },
    exists: function (file) {
        return fs_extra_1.existsSync(file);
    }
};
exports.configs = configs;
new Array(['babel', 'babel.config.js'], ['eslint', '.eslintrc.js'], ['postCss', 'postcss.config.js'], ['prettier', 'prettier.config.js'], ['stylelint', 'stylelint.config.js'], ['typescript', 'tsconfig.json'], ['js', 'jsconfig.json']).forEach(function (_a) {
    var name = _a[0], filename = _a[1];
    var projectPath = path_1.join(paths_1.paths.project, filename);
    configs.exists(projectPath) && configs.add(name, projectPath);
});
//# sourceMappingURL=configs.js.map