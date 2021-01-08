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
  configFile:
    instance.disk.get('project').get('tsconfig.json') ?? null,
})

export const setLoaders: Module.Register<Loader> = [
  'ts-loader',
  require.resolve('ts-loader'),
]

export const setItems: Module.Register<Item> = {
  [`typescript`]: {
    loader: 'ts-loader',
    options: (
      bud: Framework,
    ): Partial<LoaderOptions> | LoaderOptions =>
      bud.extensions.get('@roots/bud-typescript').all(),
  },
}

export const setRules: Module.Register<Rule.Module> = {
  [`typescript`]: {
    test: ({store}: Framework): RegExp =>
      store.get('patterns.typescript'),

    exclude: ({store}: Framework): RegExp =>
      store.get('patterns.modules'),

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
    this.extensions.set('@roots/bud-typescript.options', options)

    return this
  },
}

export const boot = (app: Framework): void => {
  app.store.set('typescript', /\.(ts|tsx)$/)
  ;['ts', 'tsx'].map(ext => {
    !app.store.get('webpack.resolve.extensions').includes(ext) &&
      app.store.merge('webpack.resolve.extensions', [ext])
  })
}
