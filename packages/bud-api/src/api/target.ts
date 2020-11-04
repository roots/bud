export const target: (
  target: string,
) => Framework.Bud = function (target) {
  this.build.config.set('target', target)

  return this
}
