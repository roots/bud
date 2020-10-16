export const template: Api.Template = function (options?: {
  template
  replacements
}) {
  options?.template &&
    this.extensions.setOptions(
      'html',
      this.hooks.filter('api.template', options?.template),
    )

  options?.replacements &&
    this.extensions.setOptions(
      'html',
      this.hooks.filter(
        'api.html.replacements',
        options?.replacements,
      ),
    )

  return this
}
