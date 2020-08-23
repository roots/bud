/**
 * @roots/bud v.2.0.0-next.0 {@link https://roots.io/bud}
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
import { __assign } from 'tslib';
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
var configs = {
    name: 'configs',
    register: __assign({}, configFiles.map(function (config) {
        var _a;
        var projectPath = join(process.cwd(), config.filename);
        if (existsSync(projectPath)) {
            return _a = {}, _a[config.name] = projectPath, _a;
        }
        return {};
    })),
};

export { configs };
