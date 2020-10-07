const plugins: Build.Plugins = function () {
  return {
    plugins: this.hooks.filter(
      'build.plugins',
      this.extensions.make(),
    ),
  }
}

export {plugins as default}
