export default async bud => {
  bud.entry('app', ['app.js', 'app.css'])

  bud.babel
    .setPresets({
      '@babel/preset-env': '@babel/preset-env',
    })
    .setPlugins({
      '@babel/plugin-transform-runtime': [
        '@babel/plugin-transform-runtime',
        {helpers: false},
      ],
    })
}
