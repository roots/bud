import {Config} from '..'

export const addPlugin: Config.AddPlugin = function (
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
