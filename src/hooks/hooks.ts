import type {Bud, Hook, Hooks} from './types'

const hooks = (logger): Hooks => ({
  logger,

  /**
   * Registered hooks.
   */
  registered: {},

  /**
   * Called hooks.
   */
  called: [],

  /**
   * Init hooks.
   */
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
  entries: function () {
    return Object.entries(this.registered)
  },

  /**
   * Register a function as a bud hook.
   */
  on: function (name, callback) {
    if (!this.registered[name]) {
      this.registered[name] = []
    }

    this.registered[name].push(callback)

    return this
  },

  /**
   * Call a bud hook.
   */
  call: function (name: string, param?: any): void {
    const bud = this.bud
    const logger = this.logger
    this.called.push(name)

    if (this.registered[name]) {
      this.registered[name].forEach(function (hook) {
        param ? hook(param, bud) : hook.fn(bud)
      })
    }
  },

  filter: function (name: string, value: any): any {
    const logger = this.logger

    this.called.push(name)

    if (! this.registered[name]) {
      return value
    }

    this.registered[name].forEach(function (hook) {
      value = hook(value)
    })

    return value
  },
})

export {hooks}
