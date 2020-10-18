export const target: Framework.API.Target = function (target) {
  this.build.config.set('target', target)

  return this
}
