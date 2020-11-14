import type Framework from '@roots/bud-typings'

export const define = function (
  this: Framework.Bud.Contract,
  values: Framework.Index<any>,
): Framework.Bud.Contract {
  this.extensions.get('webpack-define-plugin').setStore({
    ...this.extensions.get('webpack-define-plugin').getStore(),
    ...values,
  })

  return this
}
