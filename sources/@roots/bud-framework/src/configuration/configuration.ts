import type {Bud} from '@roots/bud-framework'
import type {File} from '@roots/bud-framework/context'

import {bind} from '@roots/bud-support/decorators/bind'
import {BudError} from '@roots/bud-support/errors'
import get from '@roots/bud-support/lodash/get'
import isArray from '@roots/bud-support/lodash/isArray'
import isFunction from '@roots/bud-support/lodash/isFunction'
import isObject from '@roots/bud-support/lodash/isObject'
import isString from '@roots/bud-support/lodash/isString'

/**
 * User config parser
 */
class Configuration {
  /**
   * Class constructor
   */
  public constructor(public bud: Bud) {}

  /**
   * Process dynamic configuration
   */
  @bind
  public async dynamicConfig(
    config: (bud: Bud) => Promise<any>,
  ): Promise<unknown> {
    try {
      return await config(this.bud)
    } catch (cause) {
      throw cause
    }
  }

  @bind
  public async handleConfigEntry(
    obj: any,
    [key, value]: [string, unknown],
  ) {
    if (!(key in obj)) return

    const request = obj[key]
    const normalValue = isArray(value) ? value : [value]

    const parsedValue = normalValue.map(v => {
      if (
        isString(v) &&
        (v.startsWith(`_app.`) || v.startsWith(`_bud.`))
      ) {
        return get(
          this.bud,
          v.replace(`_app.`, ``).replace(`_bud.`, ``).trim(),
        )
      }
      if (
        isString(v) &&
        (v.startsWith(`bud =>`) || v.startsWith(`app =>`))
      ) {
        return eval(v.trim())(this.bud)
      }
      if (isString(v) && v.startsWith(`=>`)) {
        return eval(v.slice(3))
      }
      return v
    })

    if (isFunction(request)) await Promise.resolve(request(...parsedValue))

    if (isObject(request))
      await Promise.all(
        Object.entries(value).map(async ([key, value]) => {
          return await Promise.resolve(
            this.handleConfigEntry(request, [key, value]),
          )
        }),
      )
  }

  /**
   * Process configuration
   */
  @bind
  public async run(description: File): Promise<void> {
    if (!description?.module) {
      throw new BudError(`No module found`, {
        props: {
          details: `There should be a module here. This is like an error with bud.js`,
          file: description,
        },
      })
    }

    const config = await description.module()

    isFunction(config)
      ? await this.dynamicConfig(config)
      : await this.staticConfig(config)
  }

  /**
   * Process static configuration
   */
  @bind
  public async staticConfig(
    config: Record<string, any>,
  ): Promise<unknown> {
    return await Promise.all(
      Object.entries(config).map(async ([key, value]) => {
        await this.handleConfigEntry(this.bud, [key, value])
      }),
    )
  }
}

export default Configuration
