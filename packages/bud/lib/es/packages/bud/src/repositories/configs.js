/**
 * @roots/bud v.2.0.0-next {@link https://roots.io/bud}
 *
 * A friendly build tool to help manage your project assets.
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
import { join } from 'path';
import { existsSync } from 'fs-extra';

var configFiles = [
    {
        name: 'babel',
        filename: 'babel.config.js',
    },
    {
        name: 'postcss',
        filename: 'postcss.config.js',
    },
    {
        name: 'js',
        filename: 'jsconfig.json',
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
