/** */
const fab = {
  false: () => false,
  true: () => true,
  undefined: () => undefined,
  null: () => null,
}

/**
 * Plugin controller
 *
 * @type    {function} webpackPluginFactory
 * @param   {array}
 */
const webpackPluginFactory = ([name, plugin], bud) => ({
  /**
   * Bud container.
   * @property {bud} bud
   */
  bud,

  /**
   * Plugin name.
   * @property {string} name
   */
  name,

  /**
   * Plugin instance.
   * @property {object} plugin
   */
  plugin,

  /**
   * Build plugin.
   *
   * @property {function} build
   * @return   {Object}
   */
  build: function () {
    this.initPlugin()
    this.bindPluginProps()
    this.setPluginOptions()
    this.mergePluginOptions()

    return this.makePlugin()
  },

  /**
   * Bind plugin props.
   *
   * @property {function} bindPluginProps
   * @return   {void}
   */
  bindPluginProps: function () {
    this.doPluginHook('pre_bind')

    this.ensurePluginProp('bud', this.bud)
    this.ensurePluginProp('options', fab.undefined())
    this.ensurePluginProp('setOptions', fab.undefined)
    this.ensurePluginProp('mergeOptions', fab.undefined)
    this.ensurePluginProp('when', fab.true)

    this.doPluginHook('post_bind')
  },

  /**
   * Ensure plugin prop is set.
   *
   * @property {function} ensurePluginProp
   * @param    {string} prop - plugin property
   * @param    {any} fallback - fallback value
   * @return   {void}
   */
  ensurePluginProp: function (prop, fallback) {
    this.plugin[prop] = this.plugin[prop] || fallback
  },

  /**
   * Initialize plugin.
   *
   * @property {function} initPlugin
   * @return   {void}
   */
  initPlugin: function () {
    this.doPluginHook('pre_init')
    this.plugin = this.plugin(this.bud)
    this.doPluginHook('post_init')
  },

  /**
   * Set plugin options.
   *
   * @property {function} setPluginOptions
   * @return   {void}
   */
  setPluginOptions: function () {
    this.doPluginHook('pre_options')

    this.boundValue = this.plugin.setOptions()

    if (this.boundValue) {
      this.doPluginHook('options', this.boundValue)

      this.plugin.options = this.boundValue
    }

    delete this.boundValue

    this.doPluginHook('post_options')
  },

  /**
   * Set plugin options.
   *
   * @property {function} setPluginOptions
   * @return   {void}
   */
  mergePluginOptions: function () {
    this.doPluginHook('pre_merge')

    this.boundValue = this.plugin.mergeOptions()

    if (this.boundValue) {
      this.doPluginHook('merge', this.boundValue)

      this.plugin.options = {
        ...this.plugin.options,
        ...this.boundValue,
      }
    }

    delete this.boundValue

    this.doPluginHook('post_merge')
  },

  /**
   * Make plugin.
   *
   * @property {function} makePlugin
   * @return   {object} constructed webpack plugin
   */
  makePlugin: function () {
    this.doPluginHook('pre')

    this.plugin = this.plugin.when()
      ? this.plugin.make()
      : fab.undefined()

    this.doPluginHook('post')

    return this.plugin
  },

  /**
   * Do plugin hook.
   *
   * @property {function} doPluginHook
   * @return   {void}
   */
  doPluginHook: function (hook, ...params) {
    this.bud.hooks.call(
      `${hook}_${this.name}`,
      this.plugin,
      ...params,
    )
  },
})

export {webpackPluginFactory}
