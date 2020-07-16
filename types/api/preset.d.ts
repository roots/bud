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
export type preset = (
  arg0: any,
  arg1: string,
) => {
  absolutePath: string
}
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
 *
 * @typedef {function (relativePath: string) => {absolutePath: string}} preset
 * @param  {string} relativePath - relative path
 * @return {string} absolutePath
 */
export function preset(relativePath: string): string
//# sourceMappingURL=preset.d.ts.map
