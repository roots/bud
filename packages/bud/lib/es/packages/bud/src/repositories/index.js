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
import { __spreadArrays } from 'tslib';
import { adapters } from './adapters/index.js';
import { cli } from './cli/index.js';
import { configs } from './configs.js';
import { env } from './env.js';
import { features } from './features.js';
import { options } from './options.js';
import { paths } from './paths.js';
import { patterns } from './patterns.js';
import { loaders } from './rulesets/loaders.js';
import { uses } from './rulesets/uses.js';
import { rules } from './rulesets/index.js';

var repositories = {
    extensions: [adapters],
    files: [configs],
    stores: __spreadArrays([
        paths,
        env
    ], cli, [
        features,
        options,
        loaders,
        cli,
        adapters,
        patterns,
        rules,
        uses,
    ]),
};

export { repositories };
