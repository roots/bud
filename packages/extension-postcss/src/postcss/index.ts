import * as postcss from './registerItems'
import {postcssConfig} from './api'

export const boot = (instance: Framework.Bud): void => {
  instance.build.setLoader(
    'postcss',
    require.resolve('postcss-loader'),
  )

  instance.build.setItem('postcss', postcss)

  const css = instance.build.getRule('css')
    .use as Framework.Webpack.RuleSetRule[]

  instance.build.mergeRule('css', {
    use: [
      ...css.splice(0, css.length - 1),
      instance.build.getItem('postcss'),
      ...css.splice(css.length - 1),
    ],
  })

  // Register instance.css config utility
  Object.assign(instance, {
    css: postcssConfig(instance).init(),
  })
}
