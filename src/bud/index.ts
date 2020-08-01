import {api} from './api'
import {hooks} from './hooks'
import {util} from './util'
import {repositories} from './repositories'
import {babel, browserSync, typescript, postCss} from './repositories/options'
import {compiler} from './compiler'
import {bindContainer, bindExtensionContainer, bindFileContainer} from './container'

/**
 * Bud framework.
 * @constructor
 */
const bootstrap = function () {
  /**
   * Bootstrap target.
   */
  this.framework = {}

  /**
   * Utilities.
   */
  this.framework.util = util
  this.framework.fs = util.fs

  /**
   * Binders.
   */
  this.store = bindContainer
  this.fileStore = bindFileContainer
  this.extensionStore = bindExtensionContainer

  /**
   * Stores.
   */
  this.repositories = repositories

  /**
   * Compiler.
   */
  this.framework.compiler = compiler

  /**
   * Hooks.
   */
  this.framework.hooks = hooks().init(this.framework)

  /**
   * API.
   */
  Object.values(api).forEach((method: any) => {
    this.framework[method.name] = method
  })

  /**
   * Base stores.
   */
  this.framework.paths = this.store(this.repositories.paths)
  this.framework.features = this.store(this.repositories.features)
  this.framework.options = this.store(this.repositories.options)

  /**
   * Derived stores.
   */
  this.framework.configs = this.fileStore(this.repositories.configs(this.framework))
  this.framework.env = this.store(this.repositories.env(this.framework))
  this.framework.flags = this.store(this.repositories.flags(this.framework))

  /**
   * Extensions.
   */
  this.framework.plugins = this.extensionStore(this.repositories.plugins)
  this.framework.adapters = this.extensionStore(this.repositories.adapters)

  /**
   * Auto-configured features.
   */
  this.framework.features.set('babel', this.framework.configs.has('babel'))
  this.framework.features.set('postCss', this.framework.configs.has('postCss'))
  this.framework.features.set('eslint', this.framework.configs.has('eslint'))
  this.framework.features.set('stylelint', this.framework.configs.has('stylelint'))
  this.framework.features.set('typescript', this.framework.configs.has('typescript'))
  this.framework.features.set('vue', this.framework.configs.has('vue'))

  /**
   * Auto-configured options.
   */
  this.framework.options.set('babel', babel(this.framework.configs))
  this.framework.options.set('postCss', postCss(this.framework.configs))
  this.framework.options.set('browserSync', browserSync(this.framework.flags))
  this.framework.options.set('typescript', typescript(this.framework.configs))

  /**
   * Accessors.
   */
  this.framework.mode = this.framework.flags.get('mode')
  this.framework.inProduction = this.framework.flags.is('mode', 'production')
  this.framework.inDevelopment = this.framework.flags.is('mode', 'development')
}

export {bootstrap}
