import * as babel from './babel'
import {babelConfig} from './api'

/**
 * Boot extension
 */
export const boot = (instance: Framework.Bud): void => {
  // Transpile js with babel
  instance.build.mergeRule('js', {
    use: [instance.build.getItem('babel')],
  })

  // Register bud.babel config utility
  Object.assign(instance, {
    babel: babelConfig(instance).init(),
  })
}

/**
 * Register module loader & item config.
 */
export const registerItem = [babel.ident, babel]
export const registerLoader = [
  'babel',
  require.resolve('babel-loader'),
]
