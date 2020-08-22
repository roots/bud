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
import { format } from 'prettier';
import { highlight } from 'cli-highlight';
import { shortCircuit } from './shortCircuit.js';

/**
 * Dump a prettified, syntax-highlighted object
 */
var dump = function (obj, prettierOptions) {
    var prettierConfig = prettierOptions !== null && prettierOptions !== void 0 ? prettierOptions : { parser: 'json' };
    var normalizedString = JSON.stringify(obj, shortCircuit());
    var prettifiedString = format(normalizedString, prettierConfig);
    var highlightedConfig = highlight(prettifiedString);
    console.log(highlightedConfig);
};

export { dump };
