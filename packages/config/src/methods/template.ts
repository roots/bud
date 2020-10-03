import {Config} from '..'

export const template: Config.Template = function ({
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
