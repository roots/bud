import ManifestPlugin from 'webpack-manifest-plugin'

const manifest = () => ({
  options: {
    filename: 'manifest.json',
    writeToFileEmit: true,
  },
  setOptions: function () {
    return {
      publicPath: `${this.bud.paths.public}/`,
    }
  },
  make: function () {
    return new ManifestPlugin(this.options)
  },
})

export {manifest}
