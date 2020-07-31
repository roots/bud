"use strict";
exports.__esModule = true;
exports.configs = void 0;
var container_1 = require("../container");
var configFiles = [
    {
        name: 'babel',
        filename: 'babel.config.js'
    },
    {
        name: 'eslint',
        filename: '.eslintrc.js'
    },
    {
        name: 'postcss',
        filename: 'postcss.config.js'
    },
    {
        name: 'prettier',
        filename: 'prettier.config.js'
    },
    {
        name: 'stylelint',
        filename: 'stylelint.config.js'
    },
    {
        name: 'typescript',
        filename: 'tsconfig.json'
    },
    {
        name: 'js',
        filename: 'jsconfig.json'
    },
    {
        name: 'vue',
        filename: 'vue.config.js'
    },
];
/**
 * ## bud.state.configs
 */
var configs = function (paths) {
    var container = new container_1.fileContainer({});
    configFiles.forEach(function (_a) {
        var name = _a.name, filename = _a.filename;
        var projectPath = container.fs.path.join(paths.get('project'), filename);
        if (container.exists(projectPath)) {
            container.set(name, projectPath);
        }
    });
    return container;
};
exports.configs = configs;
//# sourceMappingURL=configs.js.map