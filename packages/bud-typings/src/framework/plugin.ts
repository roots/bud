import {Loose} from '../base'
import {Bud} from '../bud'

export type PluginPropFallback = any

export type PluginTransform = (
  propName?: string,
  fallback?: PluginPropFallback,
) => void

/**
 * Conditional check determining whether to engage plugin functionality.
 */
export type PluginConditional = (
  this: PluginInterface,
) => boolean

/**
 * Plugin method handling options
 */
export type PluginOptions = (this: PluginInterface) => any

/**
 * Constitutes primary plugin action.
 */
export type PluginMake = (this: PluginInterface) => any

export interface PluginInterface extends Loose {
  bud?: any

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
 * Bud Plugin
 */
export type Plugin = (bud: Bud) => PluginInterface

export interface PluginRepository {
  [key: string]: Plugin
}

/**
 * Extension Repository
 */
export interface PluginRepositoryDefinition {
  name: string
  register: PluginRepository
}

export interface PluginControllerInterface extends Loose {
  use: (
    Plugin,
  ) =>
    | PluginControllerInterface
    | Promise<PluginControllerInterface>
  build: () => any | Promise<any>
  make: () => any | Promise<any>
  bindProps: PluginTransform
  setOptions: PluginTransform
  mergeOptions: PluginTransform
}
export type PluginController = PluginControllerInterface
export type PluginControllerFactory = (
  bud: Bud,
) => PluginController
