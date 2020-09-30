import Bud from '@roots/bud-types'

export const addPlugin: Bud.Config.AddPlugin = function (
  name,
  plugin,
) {
  if (!name || !plugin) {
    return
  }

  /* this.store['plugins'].set(name, (bud: Bud) => ({
    bud,
    make: function () {
      return plugin(bud)
    },
  })) */

  return this
}
