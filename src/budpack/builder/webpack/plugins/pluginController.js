/**
 * Plugin controller
 *
 */
const pluginController = ([name, plugin], bud) => ({
  bud,
  name,
  plugin,

  /**
   * Build plugin.
   *
   * @return {Object} pluginInstance
   */
  build: function () {
    this.bind()
    this.init()
    this.opts()
    plugin = this.make()

    return plugin
  },

  /**
   * Bind bud.
   *
   * @hook   [name]_bind
   * @return void
   */
  bind: function () {
    this.bud.hooks.call(`${this.name}_bind`, this.plugin)

    this.plugin = this.plugin()
    this.plugin.bud = this.bud
  },

  /**
   * Initialize plugin.
   *
   * @hook   pre_[name]_init
   * @hook   post_[name]_init
   * @return void
   */
  init: function () {
    this.bud.hooks.call(
      `pre_${this.name}_init`,
      this.plugin,
    )

    this.plugin.init && this.plugin.init()

    this.bud.hooks.call(
      `post_${this.name}_init`,
      this.plugin,
    )
  },

  /**
   * Set plugin options.
   *
   * @hook   [name]_options
   * @return void
   */
  opts: function () {
    const fallback = this.plugin.options
      ? this.plugin.options
      : null

    this.plugin.options = this.plugin.setOptions
      ? this.plugin.setOptions()
      : fallback

    this.bud.hooks.call(`${this.name}_options`, this.plugin)
  },

  /**
   * Call plugin make.
   *
   * @hook [name]
   * @return {object} constructed webpack plugin
   */
  make: function () {
    this.bud.hooks.call(this.name, this.plugin)

    if (this.plugin.when) {
      return this.plugin.when() ? this.plugin.make() : null
    }

    return this.plugin.make()
  },
})

export {pluginController}
