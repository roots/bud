export const addPlugin: Framework.API.AddPlugin = function (
  name,
  plugin,
  options,
  when,
) {
  if (!name || !plugin) return

  const extension: Framework.Extension = {
    options: options ?? {},
    make: plugin,
    when: when,
  }

  this.extensions.register(name, extension)

  return this
}
