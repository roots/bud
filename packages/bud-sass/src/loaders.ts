const miniCss = (bud: any) => ({
  loader: bud.loaders.get('miniCss'),
  options: {
    hmr: bud.features.enabled('hot'),
  },
})

const css = (bud: any) => ({
  loader: bud.loaders.get('css'),
})

const resolveUrl = (bud: any) => ({
  loader: bud.loaders.get('resolveUrl'),
  options: {
    sourceMap: bud.features.enabled('sourceMap'),
  },
})

const postCss = (bud: any) => ({
  loader: bud.loaders.get('postCss'),
  options: {
    ident: 'postcss',
    parser: 'postcss-scss',
    ...bud.options.get('postCss'),
  },
})

const sass = (bud: any) => ({
  loader: require.resolve('sass-loader'),
  options: {
    ...bud.options.get('sass'),
    sourceMap: true,
    implementation: (() => {
      try {
        if (require.resolve('sass')) {
          return require('sass')
        }
      } catch {
        return require('node-sass')
      }
    })(),
  },
})

export default {
  miniCss,
  css,
  postCss,
  resolveUrl,
  sass,
}
