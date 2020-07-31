import type {Bud} from '../types'
export type {Bud}

export type HooksConstructor = (bud: Bud) => Hooks

/**
 * ## bud.hooks
 */
export type Hooks = {
  /**
   * ## bud.hooks.init
   * @constructor
   */
  init: (any) => Hooks

  /**
   * ## bud.hooks.registered
   *
   * Registered hooks.
   */
  registered: RegisteredHooks

  /**
   * ## bud.hooks.called
   *
   * List of called hooks.
   */
  called: string[]

  /**
   * ## bud.hooks.make
   *
   * Makes a new hook.
   */
  make: Function

  /**
   * ## bud.hooks.getAll
   *
   * Returns an array of all registered hooks.
   */
  getAll: () => any[]

  /**
   * ## bud.hooks.on
   *
   * Register a function to be called with a hook.
   */
  on: (name: string, callback: Function) => void

  /**
   * ## bud.hooks.call
   *
   * Call functions registered on a hook.
   */
  call: (name: string, params?: any) => void

  filter: (name: string, value: any) => any
}

export type RegisteredHooks = {
  [name: string]: Hook[]
}

export type Hook = {
  fn: () => any
  fired: boolean
}
