/// <reference types="webpack-dev-server" />
import type { Configuration } from 'webpack';
import type { Hooks } from './hooks/types';
import type { State, Paths, Features, Options } from './repositories/types';
import type { FileContainer } from './container';
import type { Util } from './util/types';
import type * as Api from './api/types';
/**
 * ## Bud - asset management framework.
 *
 * @typedef {Bud}
 */
declare type Bud = {
    /**
     * ## bud.hooks
     *
     * Hooks
     */
    hooks: Hooks;
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
     * ## bud.util
     *
     * Helper functions.
     */
    util: Util;
    /**
     * ## bud.plugins
     *
     * Bud framework plugins and webpack adapters.
     */
    plugins: any;
    /**
     * ## bud.mode
     *
     * Current build environment ('production', 'development', 'none')
     */
    mode: Configuration['mode'];
    /**
     * ## bud.adapters
     *
     * Webpack plugins
     */
    adapters: any;
    /**
     * ## bud.paths
     *
     * Project and framework paths.
     */
    paths: Paths;
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
     * ## bud.state
     *
     * Contains the current state of the configuration Bud will build.
     */
    state: State;
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
     * ## bud.options
     *
     * Primary key value store of configuration options.
     */
    options: Options;
    /**
     * ## bud.compiler
     *
     * The compiler function which carries out the final build.
     */
    compiler: any;
    /**
     * ## bud.addPlugin
     *
     * Register a Bud extension.
     *
     * ```js
     * bud.use([require('@roots/bud-demo-plugin')])
     */
    use: Api.Use;
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
    babel: Api.BabelCfg;
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
     * ## bud.debug
     *
     * Enable or disable debug mode.
     *
     * ```js
     * bud.debug()
     * bud.debug(true)
     * ```
     *
     * ```js
     * bud.debug(false)
     * ```
     */
    debug: Api.Debug;
    /**
     * ## bud.dependencyManifest
     *
     * Configure @wordpress/dependency-extraction-webpack-plugin
     *
     * @see https://git.io/JJLxM
     *
     * ```js
     * bud.dependencyManifest({
     *   outputFormat: 'js',
     *   injectPolyfill: false,
     * })
     * ```
     */
    dependencyManifest: Api.DependencyManifest;
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
     * Dump generated webpack config for debugging
     *
     * ```js
     * bud.dump(true)
     * ```
     */
    dump: Api.Dump;
    /**
     * ## bud.eslint
     *
     * Set eslint options.
     *
     * ```js
     * bud.stylelint(true)
     */
    eslint: Api.Eslint;
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
     * bud.inlineManifest({name: 'runtime'})
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
     * ## bud.preset
     *
     * Bud ships with several preset configurations for popular build tools. This function returns the contents
     * of a specific config as a Javascript object..
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
    preset: Api.Preset;
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
     * ## bud.purge
     *
     * Purge unused CSS from compiled stylesheets
     *
     * @see https://purgecss.com/guides/wordpress.html
     * @see https://purgecss.com/configuration.html
     *
     * ```js
     * bud.purge({
     *   enabled: bud.inProduction,
     *   content: [bud.project('resources/views/**')],
     *   allow: require('purgecss-with-wordpress').whitelist,
     *   allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
     * })
     * ```
     */
    purge: Api.Purge;
    /**
     * ## bud.scss
     *
     * Enable/disable scss support
     *
     * ```js
     * bud.scss(true)
     * ```
     *
     * ```js
     * bud.scss(false)
     * ```
     */
    scss: Api.Scss;
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
     * ## bud.stylelint
     *
     * Set stylelint options.
     *
     * ```js
     * bud.stylelint({
     *  options: {
     *    fix: true,
     *  },
     * })
     */
    stylelint: Api.Stylelint;
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
     * ## bud.vendor
     *
     * Enable bundling vendor modules separately from application code.
     *
     * ```js
     * bud.vendor()
     * ```
     */
    vendor: Api.Vendor;
    /**
     * ## bud.vue
     *
     * Enable and configure vue framework support.
     *
     * ```js
     * bud.vue()
     * ```
     */
    vue: Api.Vue;
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
};
export { Bud };
//# sourceMappingURL=types.d.ts.map