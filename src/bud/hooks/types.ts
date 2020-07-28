/**
 * Hooks
 *
 * @typedef {Hooks}
 * @property {RegisteredHooks} registered
 * @property {Function} make
 * @property {function(): any[]} getAll
 * @property {function(name: string, callback: function): void} on
 * @property {function(name: string, params: any): void} call
 */
export type Hooks = {
  registered: RegisteredHooks
  make: Function
  getAll: () => any[]

  /**
   * Register a function to be called with a hook.
   *
   * @property {(name: string, callback: Function): void} call
   */
  on: (name: string, callback: Function) => void

  /**
   * Call functions registered on a hook.
   *
   * @property {(name: string, params: any): void} call
   */
  call: (name: string, params: any) => void
}

export type RegisteredHooks = {
  [name: string]: Hook[]
}

export type Hook = {
  fn: () => any
  fired: boolean
}
