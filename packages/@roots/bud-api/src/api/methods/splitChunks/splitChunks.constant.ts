export const budChunk = {
  chunks: 'all',
  test: /([\\/]@roots|webpack|style-loader|tslib|ansi|html-entities|css-loader)/,
  reuseExistingChunk: true,
  priority: -10,
  name(
    _module: string,
    chunks: {name: string}[],
    cacheGroupKey: string,
  ) {
    const names = chunks.map(item => item.name).join('.')

    return `${cacheGroupKey}/${names}`
  },
}

export const splitChunksDefault = {
  cacheGroups: {
    bud: budChunk,
    vendor: {
      chunks: 'all',
      test: /[\\/]node_modules[\\/]/,
      reuseExistingChunk: true,
      priority: -20,
      name(
        _module: string,
        chunks: {name: string}[],
        cacheGroupKey: string,
      ) {
        const names = chunks.map(item => item.name).join('.')

        return `${cacheGroupKey}/${names}`
      },
    },
  },
}
