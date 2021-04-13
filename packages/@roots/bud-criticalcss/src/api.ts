export const critical = function (options) {
  this.publish({
    'extension/critical-css-webpack-plugin/options': () => options,
  })

  return this
}
