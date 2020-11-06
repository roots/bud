/**
 * Merge babel transformOptions
 */
export const mergeConfig: Babel.Config = function (
  opts: Babel.TransformOptions,
) {
  opts.presets &&
    this.bud.build.items.merge(
      'babel.options.presets',
      opts.presets.map(preset =>
        typeof preset === 'object' ? preset : [preset],
      ),
    )

  opts.plugins &&
    this.bud.build.items.merge(
      'babel.options.plugins',
      opts.plugins.map(plugins =>
        typeof plugins === 'object' ? plugins : [plugins],
      ),
    )

  this.bud.build.items.merge('babel.options', opts)

  return this
}
