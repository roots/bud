export const target: Api.Target = function (target) {
  this.build.config.set(
    'target',
    this.hooks.filter('api.target', target),
  )

  return this
}
