import type { Loose, WebpackMode } from '@roots/bud-typings';
import type { Container } from './container';
import type { Hooks } from './hooks/types';
import type { Paths, Features, Options } from './repositories/types';
import type { FileContainer } from './container';
import type { Util } from './util/types';
import * as Api from './api/types';
import type { Vendor } from './api/vendor';
export type { Use, UsesHash } from './repositories/rulesets';
/**
 * Bud Framework Interface
 *
 * @interface
 */
export interface Bud extends Loose {
    /**
     * ## bud.adapters
     *
     * Webpack plugins
     */
    adapters: any;
    /**
     * ## bud.compiler
     *
     * The compiler function which carries out the final build.
     */
    compiler: any;
    /**
     * ## bud.configs
     *
     * Project configuration files.
     */
    configs: FileContainer;
    /**
     * ## bud.features
     *
     * Status of features
     */
    features: Features;
    /**
     * ## bud.hooks
     *
     * Hooks
     */
    hooks: Hooks;
    /**
     * ## bud.inDevelopment
     *
     * Boolean returning true if in development.
     */
    inDevelopment: boolean;
    /**
     * ## bud.inProduction
     *
     * Boolean returning true if in production.
     */
    inProduction: boolean;
    /**
     * ## bud.logger
     *
     * Debug logger
     */
    logger: any;
    /**
     * ## bud.loaders
     *
     * Webpack loaders
     */
    loaders: any;
    /**
     * ## bud.mode
     *
     * Current build environment ('production', 'development', 'none')
     */
    mode: WebpackMode;
    /**
     * ## bud.options
     *
     * Primary key value store of configuration options.
     */
    options: Options;
    /**
     * ## bud.paths
     *
     * Project and framework paths.
     */
    paths: Paths;
    /**
     * ## bud.patterns
     *
     * Regular expressions
     */
    patterns: Container;
    /**
     * ## bud.plugins
     *
     * Bud framework plugins and webpack adapters.
     */
    plugins: any;
    /**
     * ## bud.presets
     *
     * Bud ships with several preset configurations for popular build tools. This function returns an object with two properties:
     * - config: the preset as an object
     * - path: the preset path
     *
     * ```js
     * bud.presets.get('babel-wp')
     * ```
     */
    presets: Container;
    /**
     * ## bud.rules
     *
     * Webpack module loader rules.
     */
    rules: Container;
    /**
     * ## bud.util
     *
     * Helper functions.
     */
    util: Util;
    /**
     * ## bud.rules
     *
     * Webpack module loader rule loaders.
     */
    uses: Container;
    /**
     * ## bud.alias
     *
     * Resolve modules through webpack aliases. Useful for situations that may otherwise require brittle relative paths.
     *
     * Having defined this alias:
     *
     * ```js
     * bud.alias({'scripts': bud.src('scripts')})
     * ```
     *
     * You can now reference scripts against that alias in your import statements:
     *
     * ```js
     * import 'scripts/myScript' // replacing '../../myScript'
     * ```
     **/
    alias: Api.Alias;
    /**
     * ## bud.auto
     *
     * Automatically load modules instead of needing to import them.
     *
     * ```js
     * bud.auto({jquery: ['$', 'window.jQuery']})
     * ```
     */
    auto: Api.Auto;
    /**
     * ## bud.babel
     *
     * Configure Babel.
     *
     * If you prefer, you may utilize a `babel.config.js` file in the project root,
     * either alongside or in lieue of this configuration.
     *
     * Conflicts between supplied configs will be resolved in favor of the project config file.
     *
     * @see https://babeljs.io/docs/en/configuration
     */
    babel: Api.Babel;
    /**
     * ## bud.bundle
     *
     * Compile a group of assets.
     *
     * ```js
     * bud.bundle('app', [
     *   bud.src('app.js'),
     *   bud.src('app.css'),
     * ])
     * ```
     */
    bundle: Api.Bundle;
    /**
     * ## bud.compile
     *
     * Compile finalized webpack configuration and run build.
     *
     * ```
     * bud.compile()
     * ```
     */
    compile: () => void;
    /**
     * ## bud.copy
     *
     * Copy a file.
     *
     * ```js
     * bud.copy(
     *   bud.src('images/image.png'),
     *   bud.dist('image.png'),
     * )
     * ```
     */
    copy: Api.Copy;
    /**
     * ## bud.copyAll
     *
     * Copy all files from a specified source to a specified destination.
     *
     * ```js
     * bud.copyAll(
     *  bud.src('images'),
     *  bud.dist('images')
     * )
     * ```
     */
    copyAll: Api.Copy;
    /**
     * ## bud.dev
     *
     * Development server settings
     */
    dev: Api.Dev;
    /**
     * ## bud.devtool
     *
     * Specify a devtool
     */
    devtool: Api.Devtool;
    /**
     * ## bud.dist
     *
     * Yield an absolute path from a path relative to the dist dir.
     *
     * ```js
     * bud.dist('scripts/app.js')
     * ```
     */
    dist: Api.Dist;
    /**
     * ## bud.distPath
     *
     * Set the project's dist directory.
     *
     *  ```js
     * bud.distPath('dist')
     * ```
     */
    distPath: Api.PathSetter;
    /**
     * ## bud.glob
     *
     * Compile assets into a particular directory.
     *
     * ```js
     * bud.bundlePath(
     *  bud.dist('scripts'),
     *  [bud.src('scripts')],
     * )
     * ```
     */
    glob: Api.Glob;
    /**
     * ## bud.hash
     *
     * Enable or disable filename hashing of built assets.
     *
     * ```js
     * bud.hash(true)
     * ```
     */
    hash: Api.Hash;
    /**
     * ## bud.hot
     *
     * Enable or disable hot module reloading
     *
     * ```js
     * bud.hot({
     *  enabled: !bud.inProduction,
     *  host: 'bud-sandbox.valet',
     *  open: true,
     *  secure: false,
     * })
     * ```
     */
    hot: Api.Hot;
    /**
     * Inline common scripts.
     *
     * ```js
     * bud.inlineManifest('runtime')
     * ```
     */
    inlineManifest: Api.InlineManifest;
    /**
     * ## bud.map
     *
     * Enable or disable source-maps
     *
     * ```js
     * bud.map(true)
     */
    map: Api.SourceMap;
    /**
     * ## bud.mini
     *
     * Enable or disable minification
     *
     * ```js
     * bud.mini(true)
     * ```
     */
    mini: Api.Mini;
    /**
     * ## bud.postCss
     *
     * Configure PostCSS.
     *
     * If you prefer, you may utilize a postcss.config.js file in the project root,
     * either alongside or in lieue of this configuration.
     *
     * Conflicts between supplied configs will be resolved in favor of the project config file.
     *
     * ```js
     * bud.postCss({
     *   plugins: [
     *    require('astroturf'),
     *   ],
     * })
     * ```
     */
    postCss: Api.PostCss;
    /**
     * ## bud.project
     *
     * Yield an absolute path from a path relative to the `bud.projectPath`.
     *
     * ```js
     * bud.project('package.json') // absolute path to package.json
     * ```
     */
    project: Api.Project;
    /**
     * ## bud.projectPath
     *
     * Set the project base path.
     *
     * ```js
     * bud.projectPath(__dirname)
     * ```
     */
    projectPath: Api.PathSetter;
    /**
     * ## bud.publicPath
     *
     * Set the project public path.
     *
     * ### Example
     *
     * ```js
     * bud.publicPath('dist')
     * ```
     */
    publicPath: Api.PathSetter;
    /**
     * ## bud.splitting
     *
     * Enable or disable code splitting.
     *
     * ```js
     * bud.splitting(false)
     * ```
     */
    splitting: Api.Splitting;
    /**
     * ## bud.src
     *
     * Return an absolute path from a given path relative to the directory assigned by `bud.srcPath`.
     *
     * ```js
     * bud.src('scripts/app.js')
     * ```
     */
    src: Api.Src;
    /**
     * ## bud.srcPath
     *
     * Set the project's src directory.
     *
     *  ```js
     * bud.srcPath('src')
     * ```
     */
    srcPath: Api.PathSetter;
    /**
     * ## bud.sync
     *
     * Configure BrowserSync.
     *
     * ```js
     * bud.sync({
     *   enabled: !bud.inProduction,
     *   proxy: 'http://bud.test',
     *   host: 'localhost',
     *   port: 3000,
     * })
     * ```
     */
    sync: Api.Sync;
    /**
     * ## bud.target
     *
     * Set the build target. Defaults to 'web'.
     *
     * ```js
     * bud.target('web')
     * ```
     */
    target: Api.Target;
    /**
     * ## bud.terser
     *
     * Optimize build with terser.
     *
     * ```js
     * bud.terser({
     *  parse: {
     *   ecma: 8,
     *  },
     *  compress: {
     *    ecma: 5,
     *    warnings: false,
     *    comparisons: false,
     *    inline: 2,
     *  },
     * })
     * ```
     */
    terser: Api.Terser;
    /**
     * ## bud.use
     *
     * Register a Bud extension.
     *
     * ```js
     * bud.use([require('@roots/bud-demo-plugin')])
     */
    use: Api.UseExtension;
    /**
     * ## bud.vendor
     *
     * Enable bundling vendor modules separately from application code.
     *
     * ```js
     * bud.vendor()
     * ```
     */
    vendor: Vendor;
    /**
     * ## bud.watch
     *
     * Enable or disable watch mode.
     *
     * ```js
     * bud.watch({
     *  enabled: !bud.inProduction,
     *  paths: [bud.src('assets/images')],
     * })
     * ```
     */
    watch: Api.Watch;
}
/**
 * Conditional check determining whether to engage extension functionality.
 */
export declare type ExtensionConditional = (this: ExtensionInterface) => Boolean;
/**
 * Extension method handling options
 */
export declare type ExtensionOptions = (this: ExtensionInterface) => Loose;
/**
 * Constitutes primary extension action.
 */
export declare type ExtensionMake = (this: ExtensionInterface) => void;
/**
 * Bud Extension Interface
 *
 * @interface
 */
export interface ExtensionInterface extends Loose {
    /**
     * Bud container.
     */
    bud: Bud;
    /**
     * Set options
     */
    setOptions?: ExtensionOptions;
    /**
     * Merge options
     */
    mergeOptions?: ExtensionOptions;
    /**
     * Primary action of extension.
     */
    make: ExtensionMake;
    /**
     * When true extension is utilized.
     */
    when?: ExtensionConditional;
}
/**
 * Bud Extension
 */
export declare type Extension = (bud: Bud) => ExtensionInterface;
//# sourceMappingURL=types.d.ts.map