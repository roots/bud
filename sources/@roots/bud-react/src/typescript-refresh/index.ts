import type {Bud} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  development,
  label,
} from '@roots/bud-framework/extension/decorators'

/**
 * Typescript react-refresh configuration
 */
@label(`@roots/bud-react/typescript-refresh`)
@development
export default class BudTypeScriptRefresh extends Extension {
  /**
   * {@link Extension.register}
   */
  @bind
  public override async register(bud: Bud) {
    this.registerTransform(bud)
  }

  /**
   * Register tsc react-refresh transform
   */
  @bind
  public async registerTransform(bud: Bud) {
    this.logger.log(`Registering react-refresh-typescript transformer`)

    const transform = await this.import(
      `react-refresh-typescript`,
      import.meta.url,
    )

    bud.typescript.setGetCustomTransformers(() => ({
      before: [transform()],
    }))
  }
}
