const hooks = {
  registered: {},

  /**
   * Init
   */
  init: function () {
    this.registered = {}
    return this
  },

  /**
   * Make
   */
  make: (fn = () => null) => ({fn, fired: false}),

  getAll: function () {
    return Object.entries(this.registered)
  },

  /**
   * On
   *
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
   *
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
