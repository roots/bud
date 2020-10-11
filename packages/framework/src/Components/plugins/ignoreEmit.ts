import {IgnoreEmitPlugin} from './externals'

export const options = [
  /**
   * Prevent Webpack 4 from creating useless .css.js files
   * when an entrypoint includes only css assets.
   */
  /\.*\.css.?\.js/,

  /**
   * Stop users from owning themselves with a wholescale moment/locale import.
   * @see {@link https://git.io/JUaNq}
   */
  /^\.\/locale$/,
  /moment$/,
]

export const make: Framework.Extension['make'] = () => {
  return new IgnoreEmitPlugin(options)
}

export const when: Framework.Extension['when'] = () => {
  return options.length && options.length > 0
}
