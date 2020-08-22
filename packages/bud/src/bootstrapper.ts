import {api} from './api'
import {compiler} from './compiler'
import {hooks} from './hooks'
import {logger, util} from './util'
import {extensionFactory} from './extensionFactory'
import type {Bud} from './types'

/**
 * Bootstrapper
 */
const bootstrapper = function (): void {
  this.framework = {
    api,
    extensionFactory,
    fs: util.fs,
    logger,
    util,
  }

  this.apply = function (
    propertyName: string,
    propertyValue: any,
  ): void {
    this.framework[propertyName] = propertyValue
    this.framework.logger.info(
      {name: 'framework.apply'},
      `bootstrapped: bud.${propertyName}`,
    )

    return this
  }

  this.boot = function (): Bud {
    this.framework.logger.info(
      {name: 'framework.boot', framework: this.framework},
      `booting`,
    )

    this.apply('hooks', hooks(this.framework))
      .apply('process', util.processHandler(this.framework))
      .apply('compiler', compiler(this.framework))

    return this.framework
  }
}

const bootstrap = new bootstrapper()

export {bootstrap}
