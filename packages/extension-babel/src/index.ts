import {Module, Item, Loader} from '@roots/bud-typings'
import {make} from './api'
import * as babel from './babel'

export const setLoaders: Module.Register<Loader> = {
  [`babel-loader`]: require.resolve('babel-loader'),
}

export const setItems: Module.Register<Item> = {
  babel,
}

export const boot: Module.Boot = app => {
  make(app)

  app.build.rules.mutate('js', js => ({
    ...js,
    use: [
      app.build.items.get('thread'),
      app.build.items.get('cache'),
      app.build.items.get('babel'),
    ].filter(Boolean),
  }))
}
