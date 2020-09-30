import Bud from '@roots/bud-types'

export const template: Bud.Config.Template = function ({
  template,
  replacements,
}) {
  template &&
    this.options.set(
      'plugins.html.template',
      this.hooks.filter('api.template', template),
    )

  replacements &&
    this.options.merge(
      'plugins.html.replacements',
      this.hooks.filter('api.html.replacements', replacements),
    )

  return this
}
