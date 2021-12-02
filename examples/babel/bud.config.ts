import '@roots/bud-babel'
import {Bud} from '@roots/bud'

module.exports = async (app: Bud) => {
  await app
    .entry('app', '*.{js,css}')
    .when(app.isProduction, app => {
      app.splitChunks().minimize().runtime('single')
    })
    .proxy({
      target: 'http://localhost:8080',
    })
    .tap(({babel}: Bud) =>
      babel
        .setPresets({
          '@babel/preset-env': require.resolve(
            '@babel/preset-env',
          ),
        })
        .setPlugins({
          '@babel/plugin-transform-runtime': [
            require.resolve('@babel/plugin-transform-runtime'),
            {helpers: false},
          ],
          '@babel/plugin-proposal-object-rest-spread':
            require.resolve(
              '@babel/plugin-proposal-object-rest-spread',
            ),
          '@babel/plugin-syntax-dynamic-import': require.resolve(
            '@babel/plugin-syntax-dynamic-import',
          ),
          '@babel/plugin-proposal-class-properties':
            require.resolve(
              '@babel/plugin-proposal-class-properties',
            ),
        }),
    )
}
