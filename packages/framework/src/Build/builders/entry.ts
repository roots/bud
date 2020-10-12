export const entry: Build.Entry = function ({entry}) {
  return {
    entry: this.hooks.filter('webpack.entry', entry),
  }
}
