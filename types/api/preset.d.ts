/**
 * Retrieve a Bud framework preset
 */
export type preset = (arg0: any, arg1: string) => {
    absolutePath: string;
};
/**
 * Retrieve a Bud framework preset
 *
 * @example bud.preset('babel/postcss')
 * @example bud.preset('babel/preset-react')
 * @typedef {function (relativePath: string) => {absolutePath: string}} preset
 * @param  {string} relativePath - relative path
 * @return {string} absolutePath
 */
export function preset(relativePath: string): string;
//# sourceMappingURL=preset.d.ts.map