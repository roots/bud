import {bind} from '@roots/bud-support/decorators'
import {BudError} from '@roots/bud-support/errors'
import get from '@roots/bud-support/lodash/get'
import isArray from '@roots/bud-support/lodash/isArray'
import isFunction from '@roots/bud-support/lodash/isFunction'
import isObject from '@roots/bud-support/lodash/isObject'
import isString from '@roots/bud-support/lodash/isString'

import type {Bud} from '../bud.js'
import type {File} from '../types/options/context.js'

/**
 * User config parser
 */
class Configuration {
  /**
   * Class constructor
   */
  public constructor(public bud: Bud) {}

  /**
   * Process configuration
   */
  @bind
  public async run(description: File): Promise<unknown> {
    if (!description?.module) {
      throw new BudError(`No module found`, {
        props: {
          details: `There should be a module here. This is like an error with bud.js`,
          file: description,
        },
      })
    }

    return description.dynamic
      ? await this.dynamicConfig(description)
      : await this.staticConfig(description)
  }

  /**
   * Process dynamic configuration
   */
  @bind
  public async dynamicConfig(description: any): Promise<unknown> {
    this.bud.log(`processing as dynamic configuration:`, description.name)

    if (!description.module) {
      throw new Error(
        `There should be a module to load from ${description.name}, but it's missing.`,
      )
    }

    const config = await description.module()

    if (!isFunction(config)) {
      this.bud.log(
        description.name,
        `does not export a function. maybe it is a script?`,
      )
      return
    }

    try {
      return await config(this.bud)
    } catch (cause) {
      throw cause
    }
  }

  /**
   * Process static configuration
   */
  @bind
  public async staticConfig(description: File): Promise<unknown> {
    this.bud.log(`processing as static configuration:`, description.name)

    return await Promise.all(
      Object.entries(description.module).map(async ([key, value]) => {
        await this.handleConfigEntry(this.bud, [key, value])
      }),
    )
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

    if (isFunction(request)) await request(...parsedValue)

    if (isObject(request))
      await Promise.all(
        Object.entries(value).map(async ([key, value]) => {
          return await this.handleConfigEntry(request, [key, value])
        }),
      )
  }
}

export default Configuration
