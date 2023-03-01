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
    bud
      .when(`babel` in bud, ({babel}) =>
        babel.setPlugin(`@emotion/babel-plugin`),
        undefined,
        `@roots\/bud-emotion: register \`@emotion/babel-plugin\``,
      )
      .when(`swc` in bud, ({swc}) =>
        swc.plugins((plugins = []) => [
          ...plugins,
          [`@swc/plugin-emotion`, {}],
        ]),
        undefined,
        `@roots\/bud-emotion: register \`@swc/plugin-emotion\``,
      )
  }
}
