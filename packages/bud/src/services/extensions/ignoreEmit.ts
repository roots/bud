import {Module} from '@roots/bud-typings'
import {IgnoreEmitPlugin as Plugin} from 'ignore-emit-webpack-plugin'

export const options: PluginOptions = {
  ignorePatterns: [
    /**
     * Prevent Webpack 4 from creating useless .css.js files
     * when an entrypoint includes only css assets.
     */
    /\.*\.css.\.js/,

    /**
     * Stop users from owning themselves with a wholescale moment/locale import.
     *
     * @see {@link https://git.io/JUaNq}
     */
    /^\.\/locale$/,
    /moment$/,
  ],
}

export const make: Module.Make<
  Plugin,
  PluginOptions
> = options => new Plugin(options.get('ignorePatterns'))

export const when: Module.When = (_bud, options) =>
  options?.has('ignorePatterns') &&
  options.get('ignorePatterns').length > 0

export type PluginOptions = {
  ignorePatterns: Plugin['ignorePatterns']
}
