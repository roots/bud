const hooks = {
  core: [
    'pre_compile',
    'post_compile',
    'pre_babel',
    'post_babel',
  ],

  /**
   * Init
   */
  init: function () {
    this.core.map(name => {
      this[name] = []
    })

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

    this[name].push(this.make(callback));

    return this;
  },

  /**
   * Call
   *
   * @typedef {function (name: string, callback: function): void} call
   */
  call: function (name, ...params) {
    if (this[name])  {
      this[name].forEach(hook => {
        hook.fn(...params)

        hook.fired = true
      });
    }
  },
}

export {hooks}
