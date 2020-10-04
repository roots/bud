import Bud from '../../Bud'

/**
 * Returns a hooks instance with application bindings.
 */
const Hooks = (logger: Bud.Hooks['logger']): Bud.Hooks => ({
  logger,

  registered: {},

  make: (hook: Bud.Hooks.Handler) => ({
    hook,
    fired: false,
  }),

  entries: function () {
    return Object.entries(this.registered)
  },

  on: function (name, callback) {
    const entry = this.make(callback)

    if (!this.registered[name]) {
      this.registered[name] = [entry]
    } else {
      this.registered[name].push(entry)
    }

    return this
  },

  filter: function (name: string, value: any): any {
    if (!this.registered[name]) {
      return value
    }

    this.registered[name].map(entry => {
      value = entry.hook(value)

      return {
        hook: entry.hook,
        fired: true,
      }
    })

    return value
  },
})

export default Hooks
