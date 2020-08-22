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
 * Fabs: like noop but fab.
 */
var fab = {
    "false": function () { return false; },
    "true": function () { return true; },
    undefined: function () { return undefined; },
    "null": function () { return null; },
};

export { fab };
