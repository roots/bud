const plugins: Build.Plugins = function () {
  return {
    plugins: this.hooks.filter(
      'build.plugins',
      this.extensions.makePlugins(),
    ),
  }
}

export {plugins as default}
