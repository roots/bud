import ManifestPlugin from 'webpack-manifest-plugin'

const manifest = bud => ({
  options: {
    publicPath: `${bud.paths.public}`,
    filename: 'manifest.json',
    writeToFileEmit: true,
  },
  make: function () {
    return new ManifestPlugin(this.options)
  },
})

export {manifest}
