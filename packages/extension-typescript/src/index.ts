import {Bud, Extension} from '@roots/bud-typings'
import {LoaderOptions} from 'ts-loader/dist/interfaces'

export const options = (
  instance: Bud.Contract,
): Partial<LoaderOptions> | LoaderOptions => ({
  configFile: instance.fs.get('tsconfig.json') ?? null,
})

export const registerLoader: Extension.Contract['registerLoader'] = [
  'ts-loader',
  require.resolve('ts-loader'),
]

export const registerItem: Extension.Contract['registerItems'] = {
  [`typescript`]: {
    loader: 'ts-loader',

    options: (
      bud: Bud.Contract,
    ): Partial<LoaderOptions> | LoaderOptions =>
      bud.extensions.get('@roots/bud-typescript').all(),
  },
}

export const registerRule: Extension.Contract['registerRule'] = [
  'typescript',
  {
    test: ({patterns}: Bud.Contract): RegExp =>
      patterns.get('typescript'),

    exclude: ({patterns}: Bud.Contract): RegExp =>
      patterns.get('modules'),

    use: (bud: Bud.Contract) => [bud.build.items.get('ts')],
  },
]

export const api = {
  typescript: function(
    this: Bud.Contract,
    options: Partial<LoaderOptions> | LoaderOptions,
  ): Bud.Contract {
    this.extensions
      .get('@roots/bud-typescript')
      .setStore(options)

    return this
  },
}

export const boot = (instance: Bud.Contract): void => {
  instance.patterns.set('typescript', /\.(ts|tsx)$/)
  ;['ts', 'tsx'].map(ext => {
    !instance.config.get('resolve.extensions').includes(ext) &&
      instance.config.merge('resolve.extensions', [ext])
  })
}
