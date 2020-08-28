import {Repository} from './container'
import {Loose} from '@roots/bud-typings'
export declare type PluginPropFallback = any
export declare type PluginTransform = (
  propName?: string,
  fallback?: PluginPropFallback,
) => void

/**
 * Conditional check determining whether to engage plugin functionality.
 */
export declare type PluginConditional = (
  this: PluginInterface,
) => boolean

/**
 * Plugin method handling options
 */
export declare type PluginOptions = (this: PluginInterface) => any

/**
 * Constitutes primary plugin action.
 */
export declare type PluginMake = (this: PluginInterface) => any

export declare interface PluginInterface extends Loose {
  app?: any

  bud?: any
  /**
   * Plugin identifier.
   */
  name?: string

  /**
   * Plugin options.
   */
  options?: Repository

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
 * Bud Extension
 */
export declare type Plugin = (any) => PluginInterface

export declare interface PluginRepository {
  [key: string]: Plugin
}

/**
 * Extension Repository
 */
export declare interface PluginRepositoryDefinition {
  name: string
  register: PluginRepository
}

export declare interface PluginControllerInterface {
  use: Plugin
  build: () => any
  make: () => any
  bindProps: PluginTransform
  setOptions: PluginTransform
  mergeOptions: PluginTransform
}

export declare type PluginController = (
  app: any,
) => PluginControllerInterface

const pluginController: PluginController = app => ({
  app,

  use: function (plugin) {
    this.plugin = plugin(this.app)

    return this
  },

  build: function () {
    this.bindProps()
    this.setOptions()
    this.mergeOptions()

    return this.make()
  },

  /**
   * Bind plugin props
   */
  bindProps: function (): void {
    const props = this.app.hooks.filter(
      'framework.plugins.ensureProp',
      [
        ['options', this.app.util.fab.undefined()],
        ['when', this.app.util.fab.true],
        ['setOptions', this.app.util.fab.undefined],
        ['mergeOptions', this.app.util.fab.undefined],
      ],
    )

    props.map(([name, value]) => {
      if (!this.plugin.hasOwnProperty(name)) {
        this.plugin[name] = value
      }
    })
  },

  /**
   * Set plugin options.
   */
  setOptions: function () {
    this.boundValue = this.plugin.setOptions()

    if (this.boundValue) {
      this.plugin.options = this.boundValue
    }

    delete this.boundValue
  },

  /**
   * Merge plugin options.
   */
  mergeOptions: function () {
    this.boundValue = this.plugin.mergeOptions()

    if (this.boundValue) {
      this.plugin.options = {
        ...this.plugin.options,
        ...this.boundValue,
      }
    }

    delete this.boundValue
  },

  /**
   * Make plugin.
   */
  make: function () {
    this.plugin =
      this.plugin.hasOwnProperty('when') && this.plugin.when()
        ? this.plugin.make()
        : this.app.util.fab.undefined()

    if (this.plugin) {
      return this.plugin
    }
  },
})

export {pluginController}
