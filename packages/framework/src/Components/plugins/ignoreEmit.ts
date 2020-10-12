import {IgnoreEmitPlugin} from 'ignore-emit-webpack-plugin'

export const options = [
  /**
   * Prevent Webpack 4 from creating useless .css.js files
   * when an entrypoint includes only css assets.
   */
  /\.*\.css.?\.js/,

  /**
   * Stop users from owning themselves with a wholescale moment/locale import.
   *
   * @see {@link https://git.io/JUaNq}
   */
  /^\.\/locale$/,
  /moment$/,
]

export const make: Framework.Extension['make'] = (
  options: Array<RegExp | string>,
) => {
  return new IgnoreEmitPlugin(options)
}

export const when: Framework.Extension['when'] = (
  bud: Framework.Bud,
) => {
  const options = bud.extensions.getOptions('ignoreEmit')?.length
  return options > 0
}
