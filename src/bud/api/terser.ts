import type { Bud } from "./types";

/**
 * ## bud.terser
 *
 * Enable or disable minification
 *
 * ```js
 * bud.hot(true) // enable
 * ```
 *
 * ```js
 * bud.hot(false) // disable
 * ```
 */
const terser = function (options: { enable: boolean; terser: object }): Bud {
  this.state.features.terser = options?.enable ?? true;

  this.state.options.terser = {
    terserOptions: options?.terser ?? {
      parse: {
        ecma: 8,
      },
      compress: {
        ecma: 5,
        warnings: false,
        comparisons: false,
        inline: 2,
      },
      mangle: {
        safari10: true,
      },
      output: {
        ecma: 5,
        comments: false,
        ascii_only: true,
      },
    },
    cache: true,
    parallel: true,
    sourceMap: this.state.features.sourceMap,
  };

  return this;
};

export { terser };
