import {api} from './api'
import {hooks} from './hooks'
import {util, logger} from './util'
import {repositories} from './repositories'
import {compiler} from './compiler'
import {bindContainer, bindExtensionContainer, bindFileContainer} from './container'

import {Bud, Extension, ExtensionInterface, Use, UsesHash} from './types'

/**
 * Bud framework.
 *
 * @constructor
 */
const bootstrap = function (): void {
  /**
   * The framework container object.
   */
  this.framework = {}

  /**
   * Logger (pino)
   */
  this.logger = logger

  /**
   * Containers
   */
  this.repositories = repositories
  this.store = bindContainer
  this.fileStore = bindFileContainer
  this.extensionStore = bindExtensionContainer

  /**
   * Utilities and dependencies.
   */
  this.framework.logger = this.logger
  this.framework.util = util
  this.framework.fs = util.fs

  /**
   * Paths container.
   */
  this.framework.paths = this.store(this.repositories.paths, 'bud.paths')

  /**
   * Project configuration files container.
   */
  this.framework.configs = this.fileStore(
    this.repositories.configs(this.framework.paths),
    'bud.configs',
  )

  /**
   * Envvar container.
   */
  this.framework.env = this.store(
    this.repositories.env(this.framework.paths),
    'bud.env',
  )

  /**
   * CLI containers.
   */
  this.framework.args = this.store(
    this.repositories.cli.args(this.framework.env),
    'bud.args',
  )
  this.framework.flags = this.store(this.repositories.cli.flags, 'bud.flags')

  /**
   * Features container.
   */
  this.framework.features = this.store(this.repositories.features, 'bud.features')

  /**
   * Options container.
   */
  this.framework.options = this.store(this.repositories.options, 'bud.options')

  /**
   * Framework plugins container.
   */
  this.framework.plugins = this.extensionStore(
    this.repositories.plugins,
    'bud.plugins',
  )

  /**
   * Webpack module containers.
   */
  this.framework.patterns = this.store(this.repositories.patterns, 'bud.patterns')
  this.framework.loaders = this.store(this.repositories.loaders, 'bud.loaders')
  this.framework.rules = this.store(this.repositories.rules, 'bud.rules')
  this.framework.uses = this.store(this.repositories.uses, 'bud.uses')

  /**
   * Webpack plugins.
   */
  this.framework.adapters = this.extensionStore(
    this.repositories.adapters,
    'bud.adapters',
  )

  /**
   * Hooks API and store.
   */
  this.framework.hooks = hooks(this.logger).init(this.framework)

  /**
   * Compiler.
   */
  this.framework.compiler = compiler(this.framework)

  /**
   * Set mode.
   */
  this.framework.mode = this.framework.args.get('mode')
  this.framework.inProduction = this.framework.args.is('mode', 'production')
  this.framework.inDevelopment = this.framework.args.is('mode', 'development')

  /**
   * Node process handling.
   */
  this.framework.process = util.processHandler(this.framework)

  /**
   * Options defaults that require construction.
   */
  this.framework.options.set(
    'browserSync',
    this.framework.options.get('browsersync')(this.framework.flags),
  )
  this.framework.options.set(
    'babel',
    this.framework.options.get('babel')(this.framework.configs),
  )
  this.framework.options.set(
    'postcss',
    this.framework.options.get('postcss')(this.framework.flags),
  )

  /**
   * API methods.
   */
  Object.values(api).forEach((method: any) => {
    this.framework[method.name] = method

    this.logger.info(
      {name: 'bootstrap'},
      `bootstrapped api method: bud.${method.name}`,
    )
  })
}

const budInstance = new bootstrap().framework

/**
 * Bud Framework
 */
const bud: Bud = budInstance

export {bud, bootstrap}
export {Bud, Extension, ExtensionInterface, Use, UsesHash}
