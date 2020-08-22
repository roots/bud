import type {Bud, Hook, Hooks} from './types'

const hooks = (logger: any): Hooks => ({
  logger,

  /**
   * Registered hooks.
   */
  registered: {},

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
    this.logger.info(
      {name, callback: callback.name},
      'filter callback defined',
    )

    if (!this.registered[name]) {
      this.registered[name] = []
    }

    this.registered[name].push(callback)

    return this
  },

  filter: function (name: string, value: any): any {
    this.logger.info({name, value}, `${name} filter defined`)

    if (!this.registered[name]) {
      return value
    }

    this.registered[name].forEach(function (hook) {
      value = hook(value)
    })

    return value
  },
})

export {hooks}
