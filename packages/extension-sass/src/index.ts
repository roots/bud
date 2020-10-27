import {sassConfig} from './api'

export * as registerRules from './registerRules'
export * as registerItems from './registerItems'

export const boot = (instance: Framework.Bud): void => {
  ;['sass', 'scss'].map(ext => {
    !instance.build.config
      .get('resolve.extensions')
      .includes(ext) &&
      instance.build.config.merge('resolve.extensions', [ext])
  })

  Object.assign(instance, {
    sass: sassConfig(instance).init(),
  })
}

export const registerLoader = [
  'sass',
  require.resolve('sass-loader'),
]
