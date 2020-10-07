const externals: Build.Externals = function ({externals}) {
  return {
    externals: this.hooks.filter('webpack.externals', externals),
  }
}

export {externals as default}
