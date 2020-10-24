import {postcssConfig} from './api'

export const boot = (instance: Framework.Bud): void => {
  const css = instance.build.getRule('css')
    .use as Framework.Webpack.RuleSetRule[]

  instance.build.mergeRule('css', {
    use: (instance: Framework.Bud) => [
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
