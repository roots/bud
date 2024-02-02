import type {Bud} from '@roots/bud'

export default async (bud: Bud) => {
  bud.babel
    .setPresets({
      '@babel/preset-env': '@babel/preset-env',
    })
    .setPlugins({
      '@babel/plugin-transform-runtime': '@babel/plugin-transform-runtime',
    })
    .setPluginOptions(`@babel/plugin-transform-runtime`, {helpers: false})
    .done()

    .entry('app', ['app.js'])
}
