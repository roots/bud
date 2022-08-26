import type {Bud} from '@roots/bud-framework'
import {bind} from 'helpful-decorators'
import {isFunction} from 'lodash-es'

/**
 * User config parser
 *
 * @public
 */
class Configuration {
  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public app: Bud) {}

  /**
   * Process configuration
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async run(description: any): Promise<void> {
    this.app
      .log(`processing configuration`, description.name)
      .info(description)

    isFunction(description.module)
      ? await description.module(this.app)
      : await this.runStatic(description.module)

    await this.app.api.processQueue()
  }

  /**
   * Process static configuration
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async runStatic(config: Record<string, any>): Promise<void> {
    this.app.info(`configuration is static`)

    await Promise.all(
      Object.entries(config).map(async ([key, value]) => {
        const request = this.app[key]
        if (isFunction(request)) await request(value)
      }),
    )
  }
}

/**
 * Process dynamic configuration
 *
 * @public
 */
export const config = async (app: Bud) => {
  const configuration = new Configuration(app)

  app
    .log(`processing configurations`)
    .info(Object.values(app.context.config))

  await Promise.all(
    Object.values(app.context.config)
      .filter(
        ({condition, name}) =>
          name.includes(`bud`) && condition === `base`,
      )
      .map(async description => await configuration.run(description)),
  )

  await Promise.all(
    Object.values(app.context.config)
      .filter(
        ({condition, name}) =>
          name.includes(`bud`) && condition === app.mode,
      )
      .map(async description => await configuration.run(description)),
  )

  try {
    await app.hooks.fire(`config.after`)
  } catch (err) {
    app.error(err)
  }
}
