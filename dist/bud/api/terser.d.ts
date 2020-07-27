import type { Bud } from './types';
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
declare const terser: (options: {
    enable: boolean;
    terser: object;
}) => Bud;
export { terser };
//# sourceMappingURL=terser.d.ts.map