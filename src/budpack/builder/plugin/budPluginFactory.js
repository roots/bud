import camel from 'camelcase'

/**
 * Util
 */
const fab = {
  false: () => false,
  true: () => true,
  undefined: () => undefined,
  null: () => null,
}

/**
 * Bud plugin factory.
 *
 * @typedef {function} budPluginFactory
 * @param   {array}    registrant
 * @param   {string}   registrant.name
 * @param   {function} registrant.plugin
 * @param   {bud}      bud
 */
const budPluginFactory = bud => ({
  bud: bud,

  /**
   * Init plugin factory
   * @property {function} init
   */
  new: function (name, plugin) {
    this.name = name
    this.plugin = plugin

    return this
  },

  /**
   * Build plugin.
   *
   * @property {function} build
   * @return   {Object}
   */
  build: function () {
    this.initPlugin()
    this.bindPluginProps()
    this.mergePluginOptions()
    this.register()
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
    this.ensurePluginProp('on', (name, fn) =>
      this.bud.hooks.on(name, fn),
    )
    this.ensurePluginProp('call', (name, params) =>
      this.bud.hooks.call(name, params),
    )
    this.ensurePluginProp('options', fab.undefined())
    this.ensurePluginProp('mergeOptions', fab.undefined)

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
   * Register plugin callbacks.
   */
  register: function () {
    this.doPluginHook('pre_register')

    this.plugin.register && this.plugin.register()

    this.doPluginHook('post_register')
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
   * Do plugin hook.
   *
   * @property {function} doPluginHook
   * @return   {void}
   */
  doPluginHook: function (hook, ...params) {
    this.bud.hooks.call(
      `${hook}_bud_plugin_${this.name}`,
      this.plugin,
      ...params,
    )
  },
})

export {budPluginFactory}
