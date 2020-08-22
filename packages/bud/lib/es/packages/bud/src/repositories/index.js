/**
 * @roots/bud v.2.0.0-rc.7 {@link https://roots.io/bud}
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
import { adapters } from './adapters/index.js';
import { cli } from './cli/index.js';
import { configs } from './configs.js';
import { env } from './env.js';
import { features } from './features.js';
import { options } from './options.js';
import { paths } from './paths.js';
import { patterns } from './patterns.js';
import { uses } from './rulesets/uses.js';
import { loaders } from './rulesets/loaders.js';
import { rules } from './rulesets/index.js';

var repositories = {
    features: features,
    options: options,
    loaders: loaders,
    paths: paths,
    cli: cli,
    adapters: adapters,
    patterns: patterns,
    rules: rules,
    uses: uses,
    configs: configs,
    env: env,
};

export { repositories };
