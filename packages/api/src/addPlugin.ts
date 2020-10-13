export const addPlugin: Api.AddPlugin = function (
  name,
  plugin,
  options,
  when,
) {
  if (!name || !plugin) return

  const extension: Framework.Extension = {
    options: options ?? {},

    make: function (options: Framework.Extension.Options) {
      return plugin(options)
    },

    when: function () {
      return when ? when() : true
    },
  }

  this.extensions.register(name, extension)

  return this
}
