import type {Hook, Hooks} from './types'

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
 */
const hooks: Hooks = {
  /**
   * Registered hooks.
   */
  registered: {},

  /**
   * Make a bud hook
   */
  make: (fn = () => null): Hook => ({
    fn,
    fired: false
  }),

  /**
   * Get all bud hook entries.
   */
  getAll: function () {
    return Object.entries(this.registered)
  },

  /**
   * Register a function as a bud hook.
   */
  on: function (name, callback) {
    if (!this.registered[name]) {
      this.registered[name] = []
    }

    this.registered[name].push(this.make(callback))

    return this
  },

  /**
   * Call a bud hook.
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
