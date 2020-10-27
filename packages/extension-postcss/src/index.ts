import {postcssConfig} from './api'

import * as postcss from './registerItem'

export const registerItem = [postcss.ident, postcss]
export const registerLoader = [
  postcss.ident,
  require.resolve('postcss-loader'),
]

export const register = (instance: Framework.Bud): void => {
  Object.assign(instance, {
    css: postcssConfig(instance).init(),
  })
}

export const boot = (instance: Framework.Bud): void => {
  const css = instance.build.getRule('css')
    .use as Framework.Webpack.RuleSetRule[]

  instance.build.mergeRule('css', {
    use: [
      ...css.splice(0, css.length - 1),
      instance.build.getItem('postcss'),
      ...css.splice(css.length - 1),
    ],
  })
}
