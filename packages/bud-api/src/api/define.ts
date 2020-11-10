export const define: Framework.API.Define = function (
  this: Framework.Bud,
  values: Framework.Index<any>,
): Framework.Bud {
  this.extensions.get('webpack[define]').all({
    ...this.extensions.get('webpack[define]'),
    ...values,
  })

  return this
}
