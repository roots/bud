import {Bud} from '@roots/bud-framework'
import {BudError} from '@roots/bud-support/errors'
import isFunction from '@roots/bud-support/isFunction'
import logger from '@roots/bud-support/logger'

export interface bindFacade {
  (
    this: Bud,
    key: `${keyof Bud & string}`,
    fn: CallableFunction,
    binding?: unknown,
  ): Bud
}

/**
 * Bind a synchronous facade
 */
export const bindFacade: bindFacade = function (key, fn, binding?) {
  if (!isFunction(fn))
    throw new BudError(`bud.bindFacade error: ${key} is not a function.`)

  if (`bind` in fn) fn = fn.bind(binding ?? this)

  this.set(key, (...args: Array<any>) => {
    logger.enabled &&
      logger
        .scope(`bud.${key}`)
        .log(`called with args:`, args.map(parseArgs(this)).join(`, `))

    this.promise(async () => {
      try {
        await this.resolvePromises()
        await fn(...args)
      } catch (error) {
        throw error
      }
    })

    return this
  })

  return this
}

const parseArgs = (bud: Bud) => (arg: any) =>
  arg instanceof Bud
    ? `(bud)`
    : typeof arg === `function`
      ? `(function)`
      : bud.fs.json.stringify(arg)
