import type {Bud} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import {
  disabled,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import isUndefined from '@roots/bud-support/lodash/isUndefined'

/**
 * ESM output configuration
 */
@label(`@roots/bud-extensions/esm`)
@expose(`esm`)
@options({
  target: `es2020`,
})
@disabled
export default class Esm extends Extension {
  /**
   * {@link Extension.buildBefore}
   */
  public override async buildBefore(bud: Bud) {
    // @ts-ignore - circular reference
    bud.hooks
      .on(`build.experiments`, (experiments = {}) => ({
        ...experiments,
        outputModule: true,
      }))
      .hooks.on(`build.target`, this.options.target)
      .hooks.on(`build.output.chunkFormat`, `module`)
      .hooks.on('build.output.module', true)
      .hooks.on(`build.externalsType`, `import`)

    bud.when(
      () => !isUndefined(bud.context.manifest?.imports),
      ({hooks}) =>
        hooks.on(`build.externals`, externals => ({
          ...(externals ?? ({} as any)),
          ...(bud.context.manifest.imports as any),
        })),
    )
  }
}
