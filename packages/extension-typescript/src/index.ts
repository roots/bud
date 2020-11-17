import {Bud, Extension} from '@roots/bud-typings'
import {LoaderOptions} from 'ts-loader/dist/interfaces'

export const options = (
  instance: Bud.Bud,
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
      bud: Bud.Bud,
    ): Partial<LoaderOptions> | LoaderOptions =>
      bud.extensions.get('@roots/bud-typescript').all(),
  },
}

export const registerRule: Extension.Contract['registerRule'] = [
  'typescript',
  {
    test: ({patterns}: Bud.Bud): RegExp =>
      patterns.get('typescript'),

    exclude: ({patterns}: Bud.Bud): RegExp =>
      patterns.get('modules'),

    use: (bud: Bud.Bud) => [bud.build.items.get('ts')],
  },
]

export const api = {
  typescript: function (
    this: Bud.Bud,
    options: Partial<LoaderOptions> | LoaderOptions,
  ): Bud.Bud {
    this.extensions
      .get('@roots/bud-typescript')
      .setStore(options)

    return this
  },
}

export const boot = (instance: Bud.Bud): void => {
  instance.patterns.set('typescript', /\.(ts|tsx)$/)
  ;['ts', 'tsx'].map(ext => {
    !instance.config.get('resolve.extensions').includes(ext) &&
      instance.config.merge('resolve.extensions', [ext])
  })
}
