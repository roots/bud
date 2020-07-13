/**
 * Config
 */
export type config = (arg0: any, arg1: string) => {
    filePath: string;
};
/**
 * Has config
 */
export type hasConfig = (arg0: any, arg1: string) => boolean;
/**
 * Maybe config
 */
export type maybeConfig = (arg0: any, arg1: string) => (boolean | string);
/**
 * Project configuration files.
 */
export type configs = {
    babel: (boolean | string);
    eslint: (boolean | string);
    postCss: (boolean | string);
};
/**
 * Config
 *
 * @typedef {function (relativePath: string) => {filePath: string}} config
 * @param   {string} relativePath - relative path (from project root)
 * @return  {string} filePath
 */
export function config(file: any): string;
/**
 * Has config
 *
 * @typedef {function (file: string) => boolean} hasConfig
 * @param   {string} file - file path (relative to project root)
 * @return  {boolean} true if file exists
 */
export function hasConfig(file: string): boolean;
/**
 * Maybe config
 * @typedef {function (file: string) => (boolean|string)} maybeConfig
 * @param {string} file -file path (relative to project root)
 */
export function maybeConfig(file: string): string;
export namespace configs {
    export const babel: string;
    export const eslint: string;
    export const postCss: string;
}
//# sourceMappingURL=configs.d.ts.map