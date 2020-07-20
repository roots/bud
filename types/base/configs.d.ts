/**
 * Config
 *
 * @param   {string} relativePath - relative path (from project root)
 * @return  {string} filePath
 */
declare const config: (file: any) => string;
/**
 * Has config
 *
 * @param   {string} file - file path (relative to project root)
 * @return  {boolean} true if file exists
 */
declare const hasConfig: (file: any) => any;
/**
 * Maybe config
 *
 * @param {string} file - file path (relative to project root)
 * @param {string} file - fallback config file path
 */
declare const maybeConfig: (file: any, fallback?: any) => any;
/**
 * Project configuration files.
 *
 * @property {(string|boolean)} babel   - project babel.config.js
 * @property {(string|boolean)} eslint  - project .eslintrc.js
 * @property {(string|boolean)} postcss - project postcss.config.js
 * @property {(string|boolean)} typescript - project tsconfig.json
 */
declare const configs: Configs;
export { config, hasConfig, maybeConfig, configs };
export declare type Configs = {
    babel: (string | null);
    eslint: (string | null);
    postCss: (string | null);
    typescript: (string | null);
};
