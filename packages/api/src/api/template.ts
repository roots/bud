export const template: Framework.API.Template = function (options?: {
  template: string
  replacements: Framework.Index<string>
}) {
  this.features.enable('html')

  options?.template &&
    this.extensions.setOptions('html', {
      ...this.extensions.getOptions('html'),
      template: options?.template,
    })

  options?.replacements &&
    this.extensions.setOptions('html', {
      ...this.extensions.getOptions('html'),
      replacements: {
        ...this.extensions.getOptions('html').replacements,
        ...options?.replacements,
      },
    })

  return this
}
