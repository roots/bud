import {Hooks} from './'

/**
 * Returns a hooks instance with application bindings.
 */
export declare type HooksConstructor = (app: any) => Hooks

const hooks: HooksConstructor = (app: any): Hooks => ({
  logger: app.logger,
  registered: {},

  make: fn => ({
    fn,
    fired: false,
  }),

  entries: function () {
    return Object.entries(this.registered)
  },

  on: function (name, callback) {
    this.logger.info({name, callback: callback.name})

    const entry = this.make(callback)

    if (!this.registered[name]) {
      this.registered[name] = [entry]
    } else {
      this.registered[name].push(entry)
    }

    return this
  },

  filter: function (name: string, value: any): any {
    this.logger.info({name, value}, `${name} filter called`)

    if (!this.registered[name]) {
      return value
    }

    this.registered[name].map(function (hook) {
      value = hook.fn(value)

      return {
        name: hook.name,
        fired: true,
      }
    })

    return value
  },
})

export {hooks}
