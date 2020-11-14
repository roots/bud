import Framework from '@roots/bud-typings'
import {LoaderOptions} from 'ts-loader/dist/interfaces'

export const options = (
  instance: Framework.Bud.Contract,
): Partial<LoaderOptions> | LoaderOptions => ({
  configFile: instance.fs.get('tsconfig.json') ?? null,
})

export const registerLoader: Framework.Extension.Contract['registerLoader'] = [
  'ts-loader',
  require.resolve('ts-loader'),
]

export const registerItem: Framework.Extension.Contract['registerItems'] = {
  [`typescript`]: {
    loader: 'ts-loader',

    options: (
      bud: Framework.Bud.Contract,
    ): Partial<LoaderOptions> | LoaderOptions =>
      bud.extensions.get('@roots/bud-typescript').all(),
  },
}

export const registerRule: Framework.Extension.Contract['registerRule'] = [
  'typescript',
  {
    test: ({patterns}: Framework.Bud.Contract): RegExp =>
      patterns.get('typescript'),

    exclude: ({patterns}: Framework.Bud.Contract): RegExp =>
      patterns.get('modules'),

    use: (bud: Framework.Bud.Contract) => [
      bud.build.items.get('ts'),
    ],
  },
]

export const api = {
  typescript: function (
    this: Framework.Bud.Contract,
    options: Partial<LoaderOptions> | LoaderOptions,
  ): Framework.Bud.Contract {
    this.extensions.get('@roots/bud-typescript').all(options)

    return this
  },
}

export const boot = (instance: Framework.Bud.Contract): void => {
  instance.patterns.set('typescript', /\.(ts|tsx)$/)
  ;['ts', 'tsx'].map(ext => {
    !instance.config.get('resolve.extensions').includes(ext) &&
      instance.config.merge('resolve.extensions', [ext])
  })
}
