import type {Bud} from '@roots/bud-framework/bud'
import {Service} from '@roots/bud-framework/service'
import type {Compiler as Contract} from '@roots/bud-framework/services'
import {bind} from '@roots/bud-support/decorators'
import type webpack from '@roots/bud-support/webpack'
import type {
  MultiCompiler,
  MultiStats,
  WebpackError,
} from '@roots/bud-support/webpack'

/**
 * Wepback compilation controller class
 *
 * @public
 */
export class Compiler extends Service implements Contract.Service {
  /**
   * Compiler implementation
   * @public
   */
  public implementation: typeof webpack

  /**
   * Compiler instance
   * @public
   */
  public instance: Contract.Service[`instance`]

  /**
   * Compilation stats
   * @public
   */
  public stats: Contract.Service[`stats`]

  /**
   * Configuration
   * @public
   */
  public config: Contract.Service[`config`] = []

  /**
   * Initiates compilation
   *
   * @returns the compiler instance
   *
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  public async compile(): Promise<MultiCompiler> {
    this.implementation = await this.app.module.import(`webpack`)
    this.logger.log(`imported webpack`, this.implementation.version)

    this.config = !this.app.hasChildren
      ? [await this.app.build.make()]
      : await Promise.all(
          Object.values(this.app.children).map(async (child: Bud) => {
            try {
              return await child.build.make()
            } catch (error) {
              throw error
            }
          }),
        )

    try {
      await this.app.hooks.fire(`compiler.before`)
    } catch (error) {
      throw error
    }

    if (this.app.isCLI() && this.app.context.args.dry) {
      this.logger.log(`running in dry mode. exiting early.`)
      return
    }

    this.app.context.logger.timeEnd(`initialize`)

    this.instance = this.implementation(this.config)
    this.instance.hooks.done.tap(this.app.label, async (stats: any) => {
      await this.onStats(stats)
    })
    this.instance.hooks.done.tap(`${this.app.label}-close`, async () => {
      await this.app.hooks.fire(`compiler.close`)
    })

    await this.app.hooks.fire(`compiler.after`)
    return this.instance
  }

  /**
   * Stats handler
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async onStats(stats: MultiStats) {
    this.stats = stats
    await this.app.dashboard.update(stats)
  }

  /**
   * Compiler error event
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public onError(error: WebpackError) {
    this.app.isDevelopment &&
      this.app.server.appliedMiddleware?.hot?.publish({error})

    throw error
  }
}
