/**
 * ## bud.hooks
 *
 * Register callback.
 *
 * ```js
 * bud.hooks.on('hookName', function(value) {
 *   doSomething(value)
 * })}
 * ```
 *
 * Invoke registered callback(s)
 *
 * ```js
 * bud.hooks.call('hookName', value)
 * ```
 *
 * @type {Hooks}
 * @property {Hooks.registered} registered
 * @property {Hooks.make} make - make a hook
 * @property {Hooks.getAll} getAll - return all hooks
 * @property {Hooks.on} on - Register hook
 * @property {Hooks.call} call - Call a hook
 */
const hooks: Hooks = {
  /**
   * Registered hooks.
   * @property {Hooks.registered} registered
   */
  registered: {},

  /**
   * Make
   * @property {Hooks.make} make
   */
  make: (fn = () => null) => ({fn, fired: false}),

  /**
   * Get all
   * @property {Hooks.getAll} getAll
   */
  getAll: function () {
    return Object.entries(this.registered)
  },

  /**
   * On
   * @property {Hooks.on} on
   */
  on: function (name, callback) {
    if (!this.registered[name]) {
      this.registered[name] = []
    }

    this.registered[name].push(this.make(callback))

    return this
  },

  /**
   * Call
   * @property {Hooks.call} call
   */
  call: function (name, ...params) {
    if (this.registered[name]) {
      this.registered[name].forEach(function (hook) {
        hook.fn(...params)
        hook.fired = true
      })
    }
  },
}

export {hooks}

export type Hooks = {
  registered: Object,
  make: Function,
  getAll: Function,
  on: (name: string, callback: Function) => void,
  call: (name: string, params: any) => void,
}

