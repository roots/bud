import type {Bud} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  label,
} from '@roots/bud-framework/extension/decorators'

/**
 * Recommended preset
 */
@label(`@roots/bud-preset-recommend`)
@dependsOn([`@roots/bud-postcss`])
export default class BudPresetRecommend extends Extension {
  public constructor(bud: Bud) {
    super(bud)
    this.set(`dependencies`, [
      ...Object.keys(this.app.context?.manifest?.dependencies ?? {}),
      ...Object.keys(this.app.context?.manifest?.devDependencies ?? {}),
    ])
  }

  @bind
  public override async register(bud: Bud) {
    if (
      [
        `@roots/bud-babel`,
        `@roots/bud-typescript`,
        `@roots/bud-esbuild`,
        `@roots/bud-swc`,
      ].some(signifier => this.get(`dependencies`).includes(signifier))
    )
      return

    await bud.extensions.add(`@roots/bud-swc`)
  }
}
