import './interface'
import {Bud} from '@roots/bud'
import {ESBuildPlugin, ESBuildMinifyPlugin} from 'esbuild-loader'

import {setOptions} from './api/setOptions'

export const name = '@roots/bud-esbuild'

export const boot = (app: Bud) => {
  Object.assign(app, {
    esbuild: {
      setOptions: setOptions.bind(app),
    },
  })

  app.build.set('optimization', (app: Bud) => ({
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: app.build.get('items.esbuild.options.target'),
      }),
    ],
  }))

  app.extensions.add('esbuild', {
    make: () => new ESBuildPlugin(),
  })

  app.build
    .set('items.esbuild', {
      loader: require.resolve('esbuild-loader'),
      options: {
        loader: 'jsx',
        target: 'es2015',
      },
    })
    .mutate('rules.js.use', use => [
      app.build.access('items.cache'),
      app.build.access('items.thread'),
      app.build.access('items.esbuild'),
    ])
}
