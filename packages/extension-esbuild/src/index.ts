import './interface'
import {Bud} from '@roots/bud'
import {ESBuildPlugin, ESBuildMinifyPlugin} from 'esbuild-loader'
import {setOptions} from './api/setOptions'

export const name = '@roots/bud-esbuild'

export const boot = (app: Bud) => {
  Object.assign(app, {
    esbuild: {
      setOptions: setOptions.bind(app),
      tsconfigRaw: {
        compilerOptions: {
          importsNotUsedAsValues: 'remove',
        },
      },
    },
  })

  app.hooks.on('webpack.resolve.extensions', exts => [
    ...exts,
    '.ts',
    '.tsx',
  ])

  app.hooks.on(
    'webpack.devtool',
    (devtool: Bud.Webpack.Configuration['devtool']) =>
      devtool ?? 'cheap-source-map',
  )

  app.hooks.on(
    'webpack.optimization',
    (
      optimization: Bud.Webpack.Configuration['optimization'],
    ): Bud.Webpack.Configuration['optimization'] => ({
      ...optimization,
      minimizer: [
        new ESBuildMinifyPlugin({
          target: app.build.get('items.esbuild.options.target'),
          exclude: app.store.get('patterns.modules'),
        }),
      ],
    }),
  )

  app.build
    .set('items.esbuild-js', {
      loader: require.resolve('esbuild-loader'),
      options: {
        loader: 'jsx',
        target: 'es2015',
      },
    })
    .set('items.esbuild-ts', {
      loader: require.resolve('esbuild-loader'),
      options: {
        loader: 'tsx',
        target: 'es2015',
      },
    })
    .set('rules.ts', {
      test: (app: Bud) => app.store.access('patterns.ts'),
      use: (app: Bud) => [app.build.access('items.esbuild-ts')],
    })
    .mutate('rules.js.use', use => [
      app.build.access('items.esbuild-js'),
    ])

  app.extensions.add('esbuild', {
    make: () => new ESBuildPlugin(),
  })
}
