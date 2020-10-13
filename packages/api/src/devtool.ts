export const devtool: Api.Devtool = function (devtool?) {
  this.features.enable('devtool')
  devtool && this.build.config.set('devtool', devtool)

  return this
}
