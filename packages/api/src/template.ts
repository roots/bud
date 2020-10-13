export const template: Api.Template = function ({
  template,
  replacements,
}) {
  template &&
    this.extensions.setOptions(
      'template',
      this.hooks.filter('api.template', template),
    )

  replacements &&
    this.extensions.setOptions(
      'html',
      this.hooks.filter('api.html.replacements', replacements),
    )

  return this
}
