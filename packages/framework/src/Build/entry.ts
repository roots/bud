/**
 * Build: webpack.entry
 *
 * @param {Store['build'].repository}
 * @return {string | string[] | Webpack.Entry | Webpack.EntryFunc}
 */
const entry: Build.Entry = function ({entry}) {
  return {
    entry: this.hooks.filter('webpack.entry', entry),
  }
}

export {entry as default}
