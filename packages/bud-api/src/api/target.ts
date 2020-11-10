export const target: (
  target: string,
) => Framework.Bud = function (target) {
  this.config.set('target', target)

  return this
}
