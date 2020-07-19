export type Hooks = {
  registered: Object,
  make: Function,
  getAll: Function,
  on: (name: string, callback: Function) => void,
  call: (name: string, params: any) => void,
}

/**
 * Hooks
 */
const hooks: Hooks = {
  registered: {},

  /**
   * Make
   * @property {function} make
   */
  make: (fn = () => null) => ({fn, fired: false}),

  /**
   * Get all
   * @property {function} getAll
   */
  getAll: function () {
    return Object.entries(this.registered)
  },

  /**
   * On
   * @typedef {function (name: string, callback: function): void} add
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
   * @typedef {function (name: string, callback: function): void} call
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
