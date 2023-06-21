export default async bud => {
  bud.entry('app', ['app.js', 'app.css']).splitChunks(bud.isProduction)

  bud.babel
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
