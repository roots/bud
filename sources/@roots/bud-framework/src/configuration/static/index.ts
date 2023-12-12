import type {Bud} from '@roots/bud-framework'

import {bind} from '@roots/bud-support/decorators/bind'
import {BudError} from '@roots/bud-support/errors'
import get from '@roots/bud-support/get'
import isFunction from '@roots/bud-support/isFunction'
import isObject from '@roots/bud-support/isObject'
import isString from '@roots/bud-support/isString'
import logger from '@roots/bud-support/logger'

/**
 * User config parser
 */
class StaticConfiguration {
  /**
   * Process
   */
  public get logger() {
    return logger.scope(`config`, this.name)
  }

  /**
   * Class constructor
   */
  public constructor(
    public bud: Bud,
    public name: string,
  ) {}

  /**
   * Handle static config object entry
   */
  @bind
  public async processRecordEntry(
    [key, value]: [string, unknown],
    path: Array<string> = [],
  ) {
    path.push(key)

    const interpretValue = async (value: unknown) => {
      if (
        isString(value) &&
        (value.startsWith(`_app.`) || value.startsWith(`_bud.`))
      ) {
        return get(
          this.bud,
          value.replace(`_app.`, ``).replace(`_bud.`, ``).trim(),
        )
      }

      if (
        isString(value) &&
        (value.startsWith(`bud =>`) || value.startsWith(`app =>`))
      ) {
        return eval(value.trim())(this.bud)
      }

      if (
        isString(value) &&
        (value.startsWith(`async bud =>`) ||
          value.startsWith(`async app =>`))
      ) {
        return await Promise.resolve(eval(value.trim())(this.bud)).catch(
          error => {
            throw error
          },
        )
      }

      if (isString(value) && value.startsWith(`=>`)) {
        return eval(value.slice(3))
      }

      return value
    }

    const parse = async (value: Array<unknown> | unknown) => {
      return Array.isArray(value)
        ? await Promise.all(value.map(interpretValue)).catch(error => {
            throw error
          })
        : await interpretValue(value).catch(error => {
            throw error
          })
    }

    const target = path?.reduce(get, this.bud)

    if (!target) {
      throw new BudError(
        `Attempted to access bud.${path} but this doesn't seem to be an object or function.`,
      )
    }

    if (isFunction(target)) {
      const args = await parse(asArray(value))

      this.logger
        .scope(`config`)
        .log(`calling bud.${path.join(`.`)}`, `with args:`, ...args)

      const result = target(...args)

      if (result instanceof Promise) {
        await result.catch(error => {
          throw error
        })
      }

      return result
    }

    if (isObject(target)) {
      return await Promise.all(
        Object.entries(parse(value)).map(
          async entry =>
            await this.processRecordEntry(entry, path).catch(error => {
              throw error
            }),
        ),
      ).catch(error => {
        throw error
      })
    }
  }

  /**
   * Process static configuration
   */
  @bind
  public async execute(config: Record<string, any>): Promise<void> {
    try {
      await Promise.all(
        Object.entries(config).map(async ([key, value]) => {
          await this.processRecordEntry([key, value])
        }),
      )
    } catch (error) {
      throw error
    }
  }
}

const asArray = <T extends unknown = unknown>(value: Array<T> | T) =>
  Array.isArray(value) ? value : [value]

export default StaticConfiguration
