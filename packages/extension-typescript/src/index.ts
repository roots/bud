import {
  Bud,
  Extension,
  Item,
  Loader,
  Rule,
} from '@roots/bud-typings'
import {LoaderOptions} from 'ts-loader/dist/interfaces'

export const options = (
  instance: Bud,
): Partial<LoaderOptions> | LoaderOptions => ({
  configFile: instance.fs.get('tsconfig.json') ?? null,
})

export const registerLoader: Extension.Module.RegisterOne<Loader> = [
  'ts-loader',
  require.resolve('ts-loader'),
]

export const registerItem: Extension.Module.RegisterMany<Item.Module> = {
  [`typescript`]: {
    loader: 'ts-loader',
    options: (
      bud: Bud,
    ): Partial<LoaderOptions> | LoaderOptions =>
      bud.extensions.get('@roots/bud-typescript').all(),
  },
}

export const registerRule: Extension.Module.RegisterOne<Rule.Module> = [
  'typescript',
  {
    test: ({patterns}: Bud): RegExp =>
      patterns.get('typescript'),

    exclude: ({patterns}: Bud): RegExp =>
      patterns.get('modules'),

    use: (bud: Bud) => [bud.build.items.get('ts')],
  },
]

export const api = {
  typescript: function (
    this: Bud,
    options: Partial<LoaderOptions> | LoaderOptions,
  ): Bud {
    this.extensions
      .get('@roots/bud-typescript')
      .setStore(options)

    return this
  },
}

export const boot = (instance: Bud): void => {
  instance.patterns.set('typescript', /\.(ts|tsx)$/)
  ;['ts', 'tsx'].map(ext => {
    !instance.config.get('resolve.extensions').includes(ext) &&
      instance.config.merge('resolve.extensions', [ext])
  })
}
