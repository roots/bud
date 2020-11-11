import {Extension} from '@roots/bud-extensions'
import {IgnoreEmitPlugin as Plugin} from 'ignore-emit-webpack-plugin'

export const options: RawOptions = {
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

export const make: Make = opt =>
  new Plugin(opt.get('ignorePatterns'))

export const when: When = (_bud, opt) =>
  opt?.has('ignorePatterns') &&
  opt.get('ignorePatterns').length > 0

declare type RawOptions = Extension.RawOptions<{
  ignorePatterns: Plugin['ignorePatterns']
}>
declare type Options = Extension.Options<RawOptions>
declare type When = Extension.When<Options>
declare type Make = Extension.Make<Plugin, Extension.Options>
