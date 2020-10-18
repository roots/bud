export const entry: Framework.Build.Entry = function ({entry}) {
  return {
    entry: this.hooks.filter('webpack.entry', entry),
  }
}
