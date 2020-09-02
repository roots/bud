import {hooks} from './hooks'
import {util} from './util'
import {pluginController} from './pluginControllerFactory'
import {
  registerContainer,
  registerPluginContainer,
  registerFileContainer,
} from './container'

/**
 * Error on unhandled rejections.
 */
process.on('unhandledRejection', util.processHandler)

/**
 * Bootstrap
 */
const bootstrap = function (): void {
  this.hooks = hooks
  this.util = util
  this.pluginController = pluginController
  this.logger = util.logger

  this.apply = function (binding: string, value: any) {
    this[binding] = value

    return this
  }

  this.bind = function (name, store = {}) {
    this[name] = registerContainer(store)

    return this[name]
  }

  this.bindFiles = function (name, store = {}) {
    this[name] = registerFileContainer(store)

    return this[name]
  }

  this.bindPlugins = function (name, store = {}) {
    this[name] = registerPluginContainer(store)

    return this[name]
  }
}

export {bootstrap}
