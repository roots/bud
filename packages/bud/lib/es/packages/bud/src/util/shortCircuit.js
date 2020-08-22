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
/**
 * JSON.stringify replacement function
 *
 * Prevents circular references in JSON from looping
 */
var shortCircuit = function () {
    var seen = new WeakSet();
    return function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value) || key == 'UI') {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};

export { shortCircuit };
