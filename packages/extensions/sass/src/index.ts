import {sassConfig} from './api'

export * as registerRules from './registerRules'
export * as registerItems from './registerItems'

export const boot = (instance: Framework.Bud): void => {
  instance.addExtensions(['sass', 'scss'])

  // Register bud.sass config utility
  Object.assign(instance, {
    sass: sassConfig(instance).init(),
  })
}

export const registerLoader = [
  'sass',
  require.resolve('sass-loader'),
]
