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
];
var configs = function (framework) {
    var repository = {};
    var fs = framework.fs, paths = framework.paths;
    configFiles.forEach(function (_a) {
        var name = _a.name, filename = _a.filename;
        var projectPath = fs.path.join(paths.get('project'), filename);
        if (fs.existsSync(projectPath)) {
            repository[name] = projectPath;
        }
    });
    return repository;
};
export { configs };
//# sourceMappingURL=configs.js.map