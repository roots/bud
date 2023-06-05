module.exports = async app => {
  app.entry('app', ['app.js', 'app.css']).splitChunks(app.isProduction)

  app.babel
    .setPresets({
      '@babel/preset-env': require.resolve('@babel/preset-env'),
    })
    .setPlugins({
      '@babel/plugin-transform-runtime': [
        require.resolve('@babel/plugin-transform-runtime'),
        {helpers: false},
      ],
    })
}
