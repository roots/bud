import type {Bud} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import {
  disabled,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import isUndefined from '@roots/bud-support/isUndefined'

/**
 * ESM output configuration
 */
@label(`@roots/bud-extensions/esm`)
@expose(`esm`)
@disabled
export default class Esm extends Extension {
  /**
   * {@link Extension.buildBefore}
   */
  public override async buildBefore(bud: Bud) {
    bud.hooks
      .fromMap({
        'build.experiments': (experiments = {}) => ({
          ...experiments,
          outputModule: true,
        }),
        'build.output.module': true,
      })
      .when(
        () => !isUndefined(bud.context.manifest?.imports),
        ({hooks}) =>
          hooks.on(`build.externals`, externals => ({
            ...(externals ?? ({} as any)),
            ...(bud.context.manifest.imports as any),
          })),
      )
      .when(
        bud.extensions.get(`@roots/bud-extensions/html-webpack-plugin`)
          .isEnabled,
        ({extensions}) =>
          extensions
            .get(`@roots/bud-extensions/html-webpack-plugin`)
            .set(`scriptLoading`, `module`),
      )
  }
}
