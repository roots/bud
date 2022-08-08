module.exports = async app => {
  app
    .entry('app', ['app.js', 'global.css'])
    .template({template: app.path('./public/index.html')})
    .when(app.isProduction, app => {
      app.splitChunks().minimize().runtime('single')
    })
    .serve(3005)

    .babel.setPresets({
      '@babel/preset-env': require.resolve('@babel/preset-env'),
    })
    .setPlugins({
      '@babel/plugin-transform-runtime': [
        require.resolve('@babel/plugin-transform-runtime'),
        {helpers: false},
      ],
      '@babel/plugin-proposal-object-rest-spread': require.resolve(
        '@babel/plugin-proposal-object-rest-spread',
      ),
      '@babel/plugin-syntax-dynamic-import': require.resolve(
        '@babel/plugin-syntax-dynamic-import',
      ),
      '@babel/plugin-proposal-class-properties': require.resolve(
        '@babel/plugin-proposal-class-properties',
      ),
    })
}
