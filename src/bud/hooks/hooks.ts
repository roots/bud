import type {Bud, Hook, Hooks} from './types'

const hooks = (): Hooks => ({
  /**
   * Registered hooks.
   */
  registered: {},

  /**
   * Called hooks.
   */
  called: [],

  init: function (bud: Bud): Hooks {
    this.bud = bud

    return this
  },

  /**
   * Make a bud hook
   */
  make: (fn = () => null): Hook => ({
    fn,
    fired: false,
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
  call: function (name: string, param?: any): void {
    const bud = this.bud

    this.called.push(name)

    if (this.registered[name]) {
      this.registered[name].forEach(function (hook) {
        if (param) {
          hook.fn(param, bud)
        } else {
          hook.fn(bud)
        }

        hook.fired = true
      })
    }
  },

  filter: function (name: string, value: any): any {
    const bud = this.bud

    this.called.push(name)

    if (this.registered[name]) {
      this.registered[name].forEach(function (hook) {
        value = hook.fn(value, bud)
        hook.fired = true
      })
    }

    return value
  },
})

export {hooks}
