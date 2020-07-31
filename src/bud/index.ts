import {api} from './api'
import {hooks} from './hooks'
import {util} from './util'
import {envRepository, flagsRepository, pathsRepository, featuresRepository, configsRepository} from './state'
import {pluginsRepository, adaptersRepository} from './state/plugins'
import {babel, browserSync, typescript, postCss, optionsRepository} from './state/options'
import {compiler} from './compiler'
import {bindContainer, bindExtensionContainer, bindFileContainer} from './container'

/**
 * Bud framework.
 */
const bootstrap = function () {
  /** Bootstrap target */
  this.framework = {}

  /**
   * Binders
   */
  this.store = bindContainer
  this.fileStore = bindFileContainer
  this.extensionStore = bindExtensionContainer

  /**
   * Util
   */
  this.framework.util = util
  this.framework.fs = util.fs
  this.framework.compiler = compiler

  /**
   * Hooks
   */
  this.framework.hooks = hooks()

  /**
   * API methods
   */
  Object.values(api).forEach((method: any) => {
    this.framework[method.name] = method
  })

  /**
   * Simple stores.
   */
  this.framework.paths = this.store(pathsRepository)
  this.framework.features = this.store(featuresRepository)
  this.framework.options = this.store(optionsRepository)

  /**
   * Derived stores.
   */
  this.framework.configs = this.fileStore(configsRepository(this.framework))
  this.framework.env = this.store(envRepository(this.framework))
  this.framework.flags = this.store(flagsRepository(this.framework))

  /**
   * Extensions
   */
  this.framework.plugins = this.extensionStore(pluginsRepository)
  this.framework.adapters = this.extensionStore(adaptersRepository)

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
   * Simple accessors.
   */
  this.framework.mode = this.framework.flags.get('mode')
  this.framework.inProduction = this.framework.flags.is('mode', 'production')
  this.framework.inDevelopment = this.framework.flags.is('mode', 'development')
}

export {bootstrap}
