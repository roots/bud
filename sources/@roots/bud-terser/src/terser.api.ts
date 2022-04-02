import type {Framework, Terser} from '@roots/bud-framework'

export interface terser {
  (this: Framework, options: Terser.Options): Framework
}

export const terser: terser = function (
  this: Framework,
  options: Terser.Options,
): Framework {
  this.extensions.get('@roots/bud-terser').setOptions(options)

  return this
}
