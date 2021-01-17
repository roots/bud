import {Bud} from '@roots/bud'
import {assignBabel} from './api'

export * from './types'

/**
 * Extension ident
 */
export const name = '@roots/bud-babel'

/**
 * Register babel
 */
export function register(app: Bud): void {
  assignBabel(app)
    .build.set('items.babel', {
      loader: require.resolve('babel-loader'),
      options: {
        presets: [],
        plugins: [],
      },
    })
    .mutate('rules.js.use', use => [
      app.build.get('items.cache'),
      app.build.get('items.thread'),
      app.build.get('items.babel'),
    ])

  app.babel
    .addPreset('@babel/preset-env')
    .babel.addPlugin('@babel/plugin-transform-runtime', {
      helpers: false,
    })
    .babel.setOptions({
      root: app.project(),
      cacheDirectory: app.project(app.options.get('storage')),
    })
}
