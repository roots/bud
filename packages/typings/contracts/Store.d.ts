import {Framework} from './'

/**
 * Options and config store
 */
export type Store = Framework.Container<Store.Source>

/**
 * Container
 */
export type Repo<T> = {
  [K in keyof T]: Framework.Index<T[K]>
}

export declare namespace Store {
  export type Repository = Repo<Source>

  export interface Source {
    [key: string]: unknown

    /**
     * ## bud.args [🍱 _Container_]
     *
     * CLI arguments passed to Bud.
     *
     * [🔗 Documentation on bud.args](#)
     * [🔗 Documentation on containers](#)
     *
     * ### Usage
     *
     * #### Flags
     *
     * ```sh
     * $ bud build --html
     * ```
     *
     * ```js
     * bud.args.has('html') // => true
     * ```
     *
     * #### Values
     *
     * ```sh
     * $ bud build --html dist/index.html
     * ```
     *
     * ```js
     * bud.args.get('html') // => 'dist/index.html'
     * ```
     *
     * #### Arrayed
     *
     * ```sh
     * $ bud build --bento uni rainbow edamame
     * # or
     * $ bud build --bento uni --bento rainbow --bento edamame
     * ```
     *
     * ```js
     * bud.args.get('bento') // => ['uni', 'rainbow', 'edamame']
     * ```
     */
    args: Framework.Index<string | boolean | unknown>

    /**
     * ## bud.config [🍱 _Container_]
     */
    webpack: Framework.Webpack.Configuration

    /**
     * ## bud.features [🍱 _Container_]
     *
     * Collection of feature flags each indicating
     * whether or not a  particular feature
     * is enabled or disabled.
     *
     * [🔗 Documentation on bud.features](#)
     * [🔗 Documentation on containers](#)
     *
     * ### Usage
     *
     * **Get the features store**
     *
     * ```js
     * bud.features.all() // returns all the features as a `k => v` obj.
     * ```
     *
     * **Check if a given feature is enabled**
     *
     * ```js
     * bud.features.enabled('minify') // `true` if `minify` flag is on
     * ```
     *
     * **Toggle a feature**
     *
     * ```js
     * bud.features.set('gzip', false) // disable `gzip` feature flag
     * ```
     */
    features: Framework.Index<boolean>

    /**
     * ## bud.patterns [🍱 _Container_]
     *
     * Collection of common RegExp objects.
     *
     * The advantage of using them in
     * a container object is that they can be
     * easily redefined by extensions.
     *
     * - [🔗 Documentation on bud.patterns](#)
     * - [🔗 Documentation on containers](#)
     *
     * ### Usage
     *
     * **Get a regular expression matching files with `.js` extension**
     *
     * ```js
     * bud.patterns.get('js')
     * ```
     *
     * **Redefine a regular expression**
     *
     * ```js
     * bud.patterns.set('cssModule', /\.module\.css$/)
     * ```
     */
    patterns: Framework.Index<RegExp>

    /**
     * ## bud.presets [🍱 _Container_]
     *
     * Preset configuration container
     */
    presets: Framework.Index<any>

    /**
     * ## Server config repository
     */
    server: Framework.Server.Options
  }
}
