export const devtool: Framework.API.Devtool = function (
  this: Framework.Bud,
  devtool?,
) {
  this.features.enable('devtool')
  devtool && this.config.set('devtool', devtool)

  return this
}
