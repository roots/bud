import {Loose} from '@roots/container'

import FrameworkInterface from '.'

/**
 * Conditional check determining whether to engage plugin functionality.
 */
export type PluginConditional = (
  this: PluginInterface,
) => boolean

/**
 * Plugin method handling options
 */
export type PluginOptions = (this: PluginInterface) => Loose

/**
 * Constitutes primary plugin action.
 */
export type PluginMake = (this: PluginInterface) => Loose

/**
 * Plugin interface
 */
export interface PluginInterface extends Loose {
  /**
   * Framework
   */
  bud?: FrameworkInterface

  /**
   * Plugin identifier.
   */
  name?: string

  /**
   * Plugin options.
   */
  options?: Loose

  /**
   * Set plugin options
   */
  setOptions?: PluginOptions

  /**
   * Merge plugin options
   */
  mergeOptions?: PluginOptions

  /**
   * Primary action of plugin.
   */
  make: PluginMake

  /**
   * Plugin is utilized when true.
   */
  when?: PluginConditional
}

/**
 * FrameworkInterface Plugin
 */
export type Plugin = (app: FrameworkInterface) => PluginInterface

class PluginController {
  public bud: FrameworkInterface
  public plugin: PluginInterface
  public options: Loose = {}

  public constructor(app: FrameworkInterface, plugin: Plugin) {
    this.bud = app
    this.plugin = plugin(app)

    this.setOptions = this.setOptions.bind(this)
    this.mergeOptions = this.mergeOptions.bind(this)
    this.make = this.make.bind(this)
  }

  build(): any {
    this.setOptions()
    this.mergeOptions()

    return this.make()
  }

  setOptions(): void {
    if (this.plugin.setOptions) {
      const options = this.plugin.setOptions()

      if (options) {
        this.plugin.options = options
      }
    }
  }

  mergeOptions(): void {
    if (this.plugin.mergeOptions) {
      const options = this.plugin.mergeOptions()

      if (options) {
        this.plugin.options = {
          ...this.plugin.options,
          ...options,
        }
      }
    }
  }

  make(): any {
    if (this.plugin.when && this.plugin.when()) {
      return this.plugin.make()
    }
  }
}

export {PluginController as default}
