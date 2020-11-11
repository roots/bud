export const template: Framework.API.Template = function (options?: {
  template: string
  replacements: Framework.Index<string>
}) {
  this.features.enable('html')

  const plugin = this.extensions.get('html-webpack-plugin')

  options?.template && plugin.merge('template', options.template)
  options?.replacements &&
    plugin.merge('replacements', options.replacements)

  return this
}
