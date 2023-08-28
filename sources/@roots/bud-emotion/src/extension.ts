import type {Bud} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOnOptional,
  label,
} from '@roots/bud-framework/extension/decorators'

/**
 * Emotion configuration
 */
@label(`@roots/bud-emotion`)
@dependsOnOptional([`@roots/bud-babel`, `@roots/bud-swc`])
export class BudEmotion extends Extension<{}, null> {
  /**
   * {@link Extension.boot}
   */
  @bind
  public override async boot(bud: Bud) {
    if (`babel` in bud) {
      const babelPlugin = await this.resolve(
        `@emotion/babel-plugin`,
        import.meta.url,
      )
      if (typeof babelPlugin === `string`)
        bud.babel.setPlugin(`@emotion/babel-plugin`, babelPlugin)
    }

    if (`swc` in bud) {
      const swcPlugin = await this.resolve(
        `@swc/plugin-emotion`,
        import.meta.url,
      )
      if (typeof swcPlugin === `string`)
        bud.swc.setPlugins((plugins = []) => [...plugins, [swcPlugin, {}]])
    }
  }
}
