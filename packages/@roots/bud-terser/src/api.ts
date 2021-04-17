import {Framework, Terser} from '@roots/bud-framework'

export const terser: Terser.Configure = function (
  options: Terser.Options,
): Framework {
  this.store.enable('options.minify')

  this.hooks.on('extension/terser/options', () => options)

  return this
}
