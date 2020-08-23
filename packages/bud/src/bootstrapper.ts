import {api} from './api'
import {compiler} from './compiler'
import {hooks} from './hooks'
import {logger, util} from './util'
import {extensionFactory} from './extensionFactory'
import {repositories} from './repositories'

import type {Bud} from './types'

/**
 * Bootstrapper
 */
const bootstrapper = function (): void {
  this.repositories = repositories

  this.framework = {
    api,
    fs: util.fs,
    logger,
    util,
    extensionFactory,
  }

  this.apply = function (
    propertyName: string,
    propertyValue: any,
  ): void {
    logger.info(
      {name: 'framework.apply'},
      `bootstrapped: bud.${propertyName}`,
    )

    this.framework[propertyName] = propertyValue

    return this
  }

  this.boot = function (): Bud {
    logger.info(
      {name: 'framework.boot', framework: this.framework},
      `booting`,
    )

    this.framework.hooks = hooks(this.framework)
    this.framework.process = util.processHandler(this.framework)
    this.framework.compiler = compiler(this.framework)

    return this.framework
  }
}

const bootstrap = new bootstrapper()

export {bootstrap}
