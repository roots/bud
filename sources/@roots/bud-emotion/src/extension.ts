import type {Bud} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOnOptional,
  label,
} from '@roots/bud-framework/extension/decorators'
import isString from '@roots/bud-support/lodash/isString'

/**
 * Emotion configuration
 */
@label(`@roots/bud-emotion`)
@dependsOnOptional([`@roots/bud-babel`, `@roots/bud-swc`])
export class BudEmotion extends Extension<NonNullable<unknown>, null> {
  /**
   * {@link Extension.boot}
   */
  @bind
  public override async boot(bud: Bud) {
    if (`babel` in bud) {
      const emotionPlugin = await this.resolve(
        `@emotion/babel-plugin`,
        import.meta.url,
      )
      if (isString(emotionPlugin))
        bud.babel.setPlugin(`@emotion/babel-plugin`, emotionPlugin)
    }

    if (`swc` in bud) {
      const emotionPlugin = await this.resolve(
        `@swc/plugin-emotion`,
        import.meta.url,
      )
      if (isString(emotionPlugin))
        bud.swc
          .setPlugins((plugins = []) => [...plugins, [emotionPlugin, {}]])
          .setTransform((options = {}) => ({
            ...options,
            react: {
              ...(options.react ?? {}),
              importSource: `@emotion/react`,
            },
          }))
    }
  }
}
