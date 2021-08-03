/**
 * @module @roots/bud
 */

import {
  Extension,
  Framework,
  Module,
  Plugin,
  Service,
  Store,
} from '@roots/bud-framework'

import {Api} from '../services/Api'
import {Build} from '../services/Build'
import {Cache} from '../services/Cache'
import {Compiler} from '../services/Compiler'
import {Dashboard} from '../services/Dashboard'
import {Discovery} from '../services/Discovery'
import {Env} from '../services/Env'
import {Extensions} from '../services/Extensions'

/**
 * @interface Bud
 */
declare interface Bud extends Framework {
  /**
   * Service: Api
   *
   * Low-lift utilities to configure Bud
   */
  api: Api

  /**
   * Service: Build
   */
  build: Build

  /**
   * Service: Cache
   */
  cache: Cache

  /**
   * Service: Compiler
   */
  compiler: Compiler

  /**
   * Service: Dashboard
   */
  dashboard: Dashboard

  /**
   * Service: Discovery
   */
  discovery: Discovery

  /**
   * Service: Env
   */
  env: Env

  /**
   * Service: Extensions
   */
  extensions: Extensions

  /**
   * Used for instantiation of child compilers.
   */
  implementation: Framework.Constructor
}

/**
 * Bud
 */
class Bud extends Framework {
  public implementation: Framework.Constructor

  public constructor(options: Framework.Options) {
    super(options)

    this.implementation = Bud
  }
}

export {
  Bud,
  Extension,
  Framework,
  Module,
  Plugin,
  Service,
  Store,
}
