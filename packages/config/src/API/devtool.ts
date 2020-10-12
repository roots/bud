export const devtool: API.Devtool = function (devtool?) {
  this.store['features'].enable('devtool')

  devtool && this.build.config.set('devtool', devtool)

  return this
}
