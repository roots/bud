import {hooks} from './hooks'
import {logger, util} from './util'
import {extensions} from './extensions'
import {
  registerContainer,
  registerExtensionContainer,
  registerFileContainer,
} from './container'

/**
 * Bootstrap
 */
const bootstrap = function (): void {
  this.hooks = hooks
  this.util = util
  this.fs = util.fs
  this.extensions = extensions
  this.logger = logger

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

  this.bindExtensions = function (name, store = {}) {
    this[name] = registerExtensionContainer(store)

    return this[name]
  }
}

export {bootstrap}
