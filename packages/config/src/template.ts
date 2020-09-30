import Bud from '@roots/bud-types'

export const template: Bud.Config.Template = function ({
  template,
  replacements,
}) {
  template &&
    this.store['plugins'].set(
      'html.template',
      this.hooks.filter('api.template', template),
    )

  replacements &&
    this.store['plugins'].set(
      'html.replacements',
      this.hooks.filter('api.html.replacements', replacements),
    )

  return this
}
