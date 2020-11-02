export const plugins: Framework.Build.Plugins = function () {
  const plugins =
    this.extensions && this.extensions.makePlugins
      ? this.extensions.makePlugins()
      : this.build.config.get('plugins')

  return {
    plugins: this.hooks.filter('webpack.plugins', plugins),
  }
}
