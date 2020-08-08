import { join } from 'path';
import { existsSync } from 'fs-extra';
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
var configs = function (paths) {
    var repository = {};
    configFiles.forEach(function (_a) {
        var name = _a.name, filename = _a.filename;
        var projectPath = join(paths.get('project'), filename);
        if (existsSync(projectPath)) {
            repository[name] = projectPath;
        }
    });
    return repository;
};
export { configs };
//# sourceMappingURL=configs.js.map