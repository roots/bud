import {Extension} from '@roots/bud-typings'
import {IgnoreEmitPlugin as Plugin} from 'ignore-emit-webpack-plugin'

export const options: Options = {
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

export const make: Extension.Make = opt =>
  new Plugin(opt.get('ignorePatterns'))

export const when: Extension.When = (_bud, opt) =>
  opt?.has('ignorePatterns') &&
  opt.get('ignorePatterns').length > 0

declare type Options = Extension.Options<{
  ignorePatterns: Plugin['ignorePatterns']
}>
