import Bud from '@roots/bud-types'

export const addPlugin: Bud.Config.AddPlugin = function (
  name,
  plugin,
) {
  name &&
    plugin &&
    this.plugins.set(name, (bud: Bud) => ({
      bud,
      make: function () {
        return plugin(bud)
      },
    }))

  return this
}
