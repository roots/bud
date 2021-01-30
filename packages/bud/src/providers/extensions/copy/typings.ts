export interface Options {
  patterns:
    | string
    | {
        from: string
        to?: string
        context?: string

        /**
         * Allows to configure the glob pattern matching library used by the plugin.
         * {@link https://webpack.js.org/plugins/copy-webpack-plugin/#globoptions}
         */
        globOptions?: object

        /**
         * How to interpret `to`. default: undefined
         * `file` - if 'to' has extension or 'from' is file.
         * `dir` - if 'from' is directory, 'to' has no extension or ends in '/'.
         * `template` - if 'to' contains a template pattern.
         * @default undefined
         */
        toType?: 'file' | 'dir' | 'template'

        /**
         * Overwrites files already in `compilation.assets` (usually added by other plugins.
         * {@link https://webpack.js.org/plugins/copy-webpack-plugin/#force}
         * @default false
         */
        force?: boolean

        /**
         * Removes all directory references and only copies file names. (default: `false`)
         * If files have the same name, the result is non-deterministic.
         * {@link https://webpack.js.org/plugins/copy-webpack-plugin/#flatten}
         * @default false
         */
        flatten?: boolean

        /**
         * Function that modifies file contents before writing to webpack. (default: `(content, path) => content`)
         * {@link https://webpack.js.org/plugins/copy-webpack-plugin/#transform}
         * @default undefined
         */
        transform?: (
          content: Buffer,
          absoluteFrom: string,
        ) => string | Buffer | Promise<string | Buffer>

        /**
         * Enable/disable and configure caching. Default path to cache directory: node_modules/.cache/copy-webpack-plugin.
         * @default false
         */
        cacheTransform?: boolean | string | object

        /**
         * Allows to modify the writing path.
         * Returns the new path or a promise that resolves into the new path
         * @default undefined
         */
        transformPath?: (
          targetPath: string,
          absolutePath: string,
        ) => string | Promise<string>

        /**
         * Doesn't generate an error on missing file(s)
         * @default false
         */
        noErrorOnMissing?: boolean
      }
  options?: {concurrency?: number}
}
