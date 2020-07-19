/**
 * Util
 * @typedef  {fab: { false: {function () => {boolean}} }} fab
 * @property {function () => {boolean}} false
 * @property {function () => {boolean}} true
 * @property {function () => {undefined}} undefined
 * @property {function () => {null}} null
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
 * @typedef {function () => {object}} budPluginFactory
 * @param   {bud}      bud
 * @return  {factory}
 */
const budPluginFactory = bud => {
  /**
   * Bud plugin factory.
   *
   * @typedef  {object} factory
   * @property {bud} bud
   * @property {new} new
   * @property {build} build
   * @property {bindPluginProps} bindPluginProps
   * @property {ensurePluginProp} ensurePluginProp
   * @property {instantiatePlugin} instantiatePlugin
   */
  const factory = {
    /**
     * @property {bud} bud - bud container
     */
    bud,

    /**
     * Init plugin factory
     *
     * @typedef {function (name: string, plugin: object) => {factory}} new
     * @param   {string}  name
     * @param   {object}  plugin
     * @return  {factory} factory
     */
    new: function (name, plugin) {
      this.name = name
      this.plugin = plugin

      return this
    },

    /**
     * Build plugin.
     *
     * @typedef  {function () => void} build
     * @return   {void} void
     */
    build: function () {
      this.instantiatePlugin()
      this.bindPluginProps()
      this.mergePluginOptions()
      this.register()
    },

    /**
     * Bind plugin props.
     *
     * @typedef {function () => {void}} bindPluginProps
     * @return   {void} void
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
     * @typedef {function (pluginProp: string, fallback: {any}) => {void}} ensurePluginProp
     * @param   {string} pluginProp - plugin property
     * @param   {any}    fallback - fallback value
     * @return  {void}
     */
    ensurePluginProp: function (pluginProp, fallback) {
      this.plugin[pluginProp] =
        this.plugin[pluginProp] || fallback
    },

    /**
     * Instantiate plugin.
     *
     * @typedef {function () => {void}} instantiatePlugin
     * @return  {void}
     */
    instantiatePlugin: function () {
      this.doPluginHook('pre_init')

      this.plugin = this.plugin(this.bud)

      this.doPluginHook('post_init')
    },

    /**
     * Register plugin callbacks.
     *
     * @typedef {function () => {void}} register
     */
    register: function () {
      this.doPluginHook('pre_register')

      this.plugin.register && this.plugin.register()

      this.doPluginHook('post_register')
    },

    /**
     * Merge plugin options.
     *
     * @typedef {function () => {void}} mergePluginOptions
     * @return  {void}
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
  }

  return factory
}

export {budPluginFactory}
