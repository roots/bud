import '@roots/bud-framework'

export const boot = (bud: Framework.Bud): void => {
  bud.addExtensions(['sass', 'scss'])
}

export const registerLoader = [
  'sass',
  require.resolve('sass-loader'),
]

export * as registerRules from './registerRules'

export * as registerItems from './registerItems'
