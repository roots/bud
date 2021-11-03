// @ts-check

/**
 * @typedef {import('@roots/bud').Framework} Bud
 */

/**
 * @param {Bud} app
 */
module.exports = app => {
  app
    .tap(app => {
      app.babel
        .setPresets({
          '@babel/preset-env': [
            require.resolve('@babel/preset-env'),
          ],
        })
        .setPlugins({
          '@babel/plugin-transform-runtime': [
            require.resolve('@babel/plugin-transform-runtime'),
            {helpers: false},
          ],
          '@babel/plugin-proposal-object-rest-spread': [
            require.resolve(
              '@babel/plugin-proposal-object-rest-spread',
            ),
          ],
          '@babel/plugin-syntax-dynamic-import': [
            require.resolve(
              '@babel/plugin-syntax-dynamic-import',
            ),
          ],
          '@babel/plugin-proposal-class-properties': [
            require.resolve(
              '@babel/plugin-proposal-class-properties',
            ),
          ],
        })
    })
    .template()
    .entry('app', '*.{js,css}')
    .splitChunks()
    .minimize()
}
