/**
 * ## bud.preset
 *
 * Retrieve a Bud framework preset.
 *
 * ### Examples
 *
 * ```js
 * bud.preset('babel/postcss')
 * ```
 *
 * ```js
 * bud.preset('babel/preset-react')
 * ```
 *
 * ```js
 * bud.preset('tsconfig')
 * ```
 */
declare const preset: Preset;
export { preset };
export declare type Preset = (relativePath: string) => any;
//# sourceMappingURL=preset.d.ts.map