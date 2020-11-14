import type Framework from '@roots/bud-typings'

export const template = function (options?: {
  template: string
  replacements: Framework.Index<string>
}): Framework.Bud.Contract {
  this.features.set('html', true)

  const plugin = this.extensions.get('html-webpack-plugin')

  options?.template && plugin.merge('template', options.template)
  options?.replacements &&
    plugin.merge('replacements', options.replacements)

  return this
}
