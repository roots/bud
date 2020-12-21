import {
  Framework,
  Module,
  Item,
  Loader,
  Rule,
} from '@roots/bud-typings'
import {LoaderOptions} from 'ts-loader/dist/interfaces'

export const options = (
  instance: Framework,
): Partial<LoaderOptions> | LoaderOptions => ({
  configFile: instance.fs.get('tsconfig.json') ?? null,
})

export const registerLoader: Module.RegisterOne<Loader> = [
  'ts-loader',
  require.resolve('ts-loader'),
]

export const registerItem: Module.RegisterMany<Item.Module> = {
  [`typescript`]: {
    loader: 'ts-loader',
    options: (
      bud: Framework,
    ): Partial<LoaderOptions> | LoaderOptions =>
      bud.extensions.get('@roots/bud-typescript').all(),
  },
}

export const registerRules: Module.RegisterMany<Rule.Module> = {
  [`typescript`]: {
    test: ({patterns}: Framework): RegExp =>
      patterns.get('typescript'),

    exclude: ({patterns}: Framework): RegExp =>
      patterns.get('modules'),

    use: (bud: Framework): Item.Module[] => [
      bud.build.items.get('ts'),
    ],
  },
}

export const api = {
  typescript: function (
    this: Framework,
    options: Partial<LoaderOptions> | LoaderOptions,
  ): Framework {
    this.extensions
      .get('@roots/bud-typescript')
      .setStore(options)

    return this
  },
}

export const boot = (instance: Framework): void => {
  instance.patterns.set('typescript', /\.(ts|tsx)$/)
  ;['ts', 'tsx'].map(ext => {
    !instance.config.get('resolve.extensions').includes(ext) &&
      instance.config.merge('resolve.extensions', [ext])
  })
}
