export const define: Framework.API.Define = function (
  this: Framework.Bud,
  values: Framework.Index<any>,
): Framework.Bud {
  this.extensions.setOptions('define', {
    ...this.extensions.getOptions('define'),
    ...values,
  })

  return this
}
