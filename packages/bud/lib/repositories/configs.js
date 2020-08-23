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
var configFiles = [
    {
        name: 'babel',
        filename: 'babel.config.js'
    },
    {
        name: 'postcss',
        filename: 'postcss.config.js'
    },
    {
        name: 'js',
        filename: 'jsconfig.json'
    },
];
var configs = {
    name: 'configs',
    register: __assign({}, configFiles.map(function (config) {
        var _a;
        var projectPath = path_1.join(process.cwd(), config.filename);
        if (fs_extra_1.existsSync(projectPath)) {
            return _a = {}, _a[config.name] = projectPath, _a;
        }
        return {};
    }))
};
exports.configs = configs;
//# sourceMappingURL=configs.js.map