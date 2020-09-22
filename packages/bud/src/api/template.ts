import {BudInterface} from '../'

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
  template: string,
  replacements?: {[key: string]: string},
) => BudInterface

const template: Template = function (
  this: BudInterface,
  template,
  replacements?,
) {
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

export {template as default}
