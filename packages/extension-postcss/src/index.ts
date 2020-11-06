import {postcssConfig} from './api'

import * as postcss from './registerItem'

export const api = (
  instance: Framework.Bud,
): Framework.Index<any> => ({
  css: postcssConfig(instance).init(),
})

export const boot = ({build}: Framework.Bud): void => {
  build.rules.mutate('css.use', css => [
    ...css.splice(0, css.length - 1),
    build.items.get('postcss'),
    ...css.splice(css.length - 1),
  ])
}

export const registerItem = [postcss.ident, postcss]

export const registerLoader = [
  postcss.ident,
  require.resolve('postcss-loader'),
]
