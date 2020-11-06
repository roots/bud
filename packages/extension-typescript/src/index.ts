import {Webpack} from '@roots/bud-typings'
import {LoaderOptions} from 'ts-loader/dist/interfaces'

export const options = (instance: Framework.Bud) => ({
  configFile: instance.fs.get('tsconfig.json') ?? null,
})

export const registerLoader = [
  'ts-loader',
  require.resolve('ts-loader'),
]

export const registerItem = [
  'ts',
  {
    loader: 'ts-loader',
    options: (
      bud: Framework.Bud,
    ): Partial<LoaderOptions> | LoaderOptions =>
      bud.extensions.getOptions('@roots/bud-typescript'),
  },
]

export const registerRule = [
  'typescript',
  {
    test: ({patterns}: Framework.Bud): RegExp =>
      patterns.get('typescript'),
    exclude: ({patterns}: Framework.Bud): RegExp =>
      patterns.get('modules'),
    use: (bud: Framework.Bud): Webpack.RuleSetUseItem[] => [
      bud.build.items.get('ts'),
    ],
  },
]

export const api = {
  typescript: function (
    this: Framework.Bud,
    options: Partial<LoaderOptions> | LoaderOptions,
  ): Framework.Bud {
    this.extensions.setOptions('@roots/bud-typescript', options)

    return this
  },
}

export const boot = (instance: Framework.Bud): void => {
  instance.patterns.set('typescript', /\.(ts|tsx)$/)
  ;['ts', 'tsx'].map(ext => {
    !instance.build.config
      .get('resolve.extensions')
      .includes(ext) &&
      instance.build.config.merge('resolve.extensions', [ext])
  })
}
