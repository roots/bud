import type {Framework} from './index.d'

/**
 * Hooks store.
 */
type RegisteredHooks = {
  [name: string]: Hook[]
}

/**
 * A hook definition
 */
type Hook = {
  fn: () => any
  value: any
  fired: boolean
}

/**
 * Framework hooks
 */
type Hooks = {
  /**
   * Framework logging utility
   */
  logger: Framework['logger']

  /**
   * Logging
   */
  registered: RegisteredHooks

  /**
   * Formats a callback as registrable entry.
   */
  make: (any) => any

  /**
   * Returns all registered hooks.
   */
  entries: () => any[]

  /**
   * Sets a callback on a filter event.
   */
  on: (name: string, callback: (any) => any) => void

  /**
   * Calls registered callbacks
   */
  filter: (name: string, value: any) => any
}

/**
 * Returns a hooks instance with application bindings.
 */
type HooksConstructor = (app: any) => Hooks

export type {Hooks, HooksConstructor, Hook, RegisteredHooks}
