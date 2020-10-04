import {Config} from '..'

export const addPlugin: Config.AddPlugin = function (
  name,
  plugin,
  when,
) {
  if (!name || !plugin) {
    return
  }

  this.store['components']['plugins'].set(name, bud => ({
    bud,
    make: function () {
      return plugin(bud)
    },
    when: function () {
      return when ? when() : true
    },
  }))

  return this
}
