// @ts-check
/**
 * @param {import('@roots/bud').Bud} bud
 */
export default async bud => {
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
    .done()

    .entry('app', ['app.js'])
}
