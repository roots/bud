module.exports = async app => {
  app
    .entry('app', ['app.js', 'global.css'])
    .when(app.isProduction, app => {
      app.splitChunks().minimize().runtime('single')
    })

    .babel.setPresets({
      '@babel/preset-env': require.resolve('@babel/preset-env'),
    })
    .setPlugins({
      '@babel/plugin-transform-runtime': [
        require.resolve('@babel/plugin-transform-runtime'),
        {helpers: false},
      ],
    })
}
