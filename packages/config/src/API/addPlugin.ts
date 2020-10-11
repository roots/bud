export const addPlugin: API.AddPlugin = function (
  name,
  plugin,
  when,
) {
  if (!name || !plugin) {
    return
  }

  this.extensions.registerExtension(name, {
    make: function (bud: Framework.Bud) {
      return plugin(bud)
    },

    when: function () {
      return when ? when() : true
    },
  })

  return this
}
