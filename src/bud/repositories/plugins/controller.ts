import type {Bud, Controller} from './types'

/**
 * Plugin controller.
 *
 * @param {Bud} bud
 * @return {Controller}
 * @this {Bud}
 */
const controller = (bud: Bud): Controller => ({
  bud,

  /**
   * Build plugin.
   */
  build: function ({name, extension}) {
    this.plugin = extension
    this.name = name

    this.bindPluginProps()
    this.setPluginOptions()
    this.mergePluginOptions()

    return this.makePlugin()
  },

  /**
   * Bind plugin props
   */
  bindPluginProps: function (): void {
    this.doPluginHook('pre_bind')

    this.ensurePluginProp('bud', this.bud)
    this.ensurePluginProp('options', this.bud.util.fab.undefined())
    this.ensurePluginProp('setOptions', this.bud.util.fab.undefined)
    this.ensurePluginProp('mergeOptions', this.bud.util.fab.undefined)
    this.ensurePluginProp('when', this.bud.util.fab.true)

    this.doPluginHook('post_bind')
  },

  /**
   * Ensure plugin prop is set.
   */
  ensurePluginProp: function (prop, fallback): void {
    this.plugin[prop] = this.plugin[prop] || fallback
  },

  /**
   * Set plugin options.
   */
  setPluginOptions: function (): void {
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
   * Merge plugin options.
   */
  mergePluginOptions: function (): void {
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
   * @property {function} makePlugin
   * @return   {object} constructed webpack plugin
   */
  makePlugin: function (): object {
    this.doPluginHook('pre')

    this.plugin =
      this.plugin.when() && this.plugin.make
        ? this.plugin.make()
        : this.bud.util.fab.undefined()

    this.doPluginHook('post')

    if (this.plugin) {
      return this.plugin
    }
  },

  /**
   * Do plugin hook.
   * @property {function} doPluginHook
   * @return   {void}
   */
  doPluginHook: function (hook, ...params): void {
    this.bud.hooks.call(`${hook}_${this.name}`, this.plugin, ...params)
  },
})

export {controller}
