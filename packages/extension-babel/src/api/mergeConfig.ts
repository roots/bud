import type {Bud} from '@roots/bud-typings'
import type {TransformOptions} from '@babel/core'

/**
 * Merge babel transformOptions
 */
export const mergeConfig = function (
  opts: TransformOptions,
): Bud.App {
  opts.presets &&
    this.build.items.merge(
      'babel.options.presets',
      opts.presets.map(preset =>
        typeof preset === 'object' ? preset : [preset],
      ),
    )

  opts.plugins &&
    this.build.items.merge(
      'babel.options.plugins',
      opts.plugins.map(plugins =>
        typeof plugins === 'object' ? plugins : [plugins],
      ),
    )

  this.build.items.merge('babel.options', opts)

  return this
}
