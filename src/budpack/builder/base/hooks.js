const hooks = {
  core: [],

  /**
   * Init
   */
  init: function () {
    return this
  },

  /**
   * Make
   */
  make: (fn = () => null) => ({fn, fired: false}),

  /**
   * On
   *
   * @typedef {function (name: string, callback: function): void} add
   */
  on: function (name, callback) {
    if (!this[name]) {
      this[name] = []
    }

    this[name].push(this.make(callback))

    return this
  },

  /**
   * Call
   *
   * @typedef {function (name: string, callback: function): void} call
   */
  call: function (name, ...params) {
    if (this[name]) {
      this[name].forEach(function (hook) {
        hook.fn(...params)
        hook.fired = true
      })
    }
  },
}

export {hooks}
