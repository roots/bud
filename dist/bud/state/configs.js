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
new Array({
    name: 'babel',
    filename: 'babel.config.js'
}, {
    name: 'eslint',
    filename: '.eslintrc.js'
}, {
    name: 'postcss',
    filename: 'postcss.config.js'
}, {
    name: 'prettier',
    filename: 'prettier.config.js'
}, {
    name: 'stylelint',
    filename: 'stylelint.config.js'
}, {
    name: 'typescript',
    filename: 'tsconfig.json'
}, {
    name: 'js',
    filename: 'jsconfig.json'
}, {
    name: 'vue',
    filename: 'vue.config.js'
}).forEach(function (_a) {
    var name = _a.name, filename = _a.filename;
    var projectPath = path_1.join(paths_1.paths.project, filename);
    configs.exists(projectPath) && configs.add(name, projectPath);
});
//# sourceMappingURL=configs.js.map