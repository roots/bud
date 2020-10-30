export const addPlugin: Framework.API.AddPlugin = function (
  extension: Framework.Extension,
) {
  this.extensions.register(name, extension)

  return this
}
