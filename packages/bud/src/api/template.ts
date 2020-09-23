import {BudInterface} from '../'

interface TemplateProps {
  template?: string
  replacements?: {[key: string]: string}
}

/**
 * ## bud.template
 *
 * Add an HTML template to generate html boilerplate with.
 *
 * ```js
 * bud.template(bud.src('template.html'))
 * ```
 */
export type Template = (
  this: BudInterface,
  TemplateProps,
) => BudInterface

const template: Template = function (
  this: BudInterface,
  {template = null, replacements = null},
) {
  template &&
    this.options.set(
      'plugins.html.template',
      this.hooks.filter('api.template', template),
    )

  replacements &&
    replacements &&
    this.options.merge(
      'plugins.html.replacements',
      this.hooks.filter('api.html.replacements', replacements),
    )

  return this
}

export {template as default}
