import {fab} from '../util/fab'

/**
 * Bud plugin controller factory.
 *
 * @param   {bud}      bud
 * @return  {BudPluginController}
 */
const pluginControllerFactory: BudConstructor = (
  bud: bud,
): BudPluginController => ({
  /**
   * @property {BudPluginController.bud}
   */
  bud: bud,

  /**
   * Initialize controller.
   *
   * @property {BudPluginController.new}
   * @return   {BudPluginController}
   */
  new: function (
    name: string,
    plugin: object,
  ): BudPluginController {
    this.name = name
    this.plugin = plugin

    return this
  },

  /**
   * Build plugin.
   *
   * @property {BudPluginController.build}
   * @return {void}
   */
  build: function (): void {
    this.instantiatePlugin()
    this.bindPluginProps()
    this.mergePluginOptions()
    this.register()
  },

  /**
   * Bind plugin props.
   *
   * @property {BudPluginController.bindPluginProps}
   * @return   {void}
   */
  bindPluginProps: function (): void {
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
   * @property {BudPluginController.ensurePluginProp}
   * @param    {string} pluginProp - plugin property
   * @param    {any} fallback - fallback value
   * @return   {void}
   */
  ensurePluginProp: function (
    pluginProp: string,
    fallback: any,
  ): void {
    this.plugin[pluginProp] =
      this.plugin[pluginProp] || fallback
  },

  /**
   * Instantiate plugin.
   *
   * @typedef {BudPluginController.instantiatePlugin}
   * @return  {void}
   */
  instantiatePlugin: function (): void {
    this.doPluginHook('pre_init')

    this.plugin = this.plugin(this.bud)

    this.doPluginHook('post_init')
  },

  /**
   * Register plugin callbacks.
   *
   * @typedef {BudPluginController.register} register
   */
  register: function (): void {
    this.doPluginHook('pre_register')

    this.plugin.register && this.plugin.register()

    this.doPluginHook('post_register')
  },

  /**
   * Merge plugin options.
   *
   * @typedef {BudPluginController.mergePluginOptions}
   * @return  {void}
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
   * Do plugin hook.
   *
   * @property {function} doPluginHook
   * @return   {void}
   */
  doPluginHook: function (hook, ...params): void {
    this.bud.hooks.call(
      `${hook}_bud_plugin_${this.name}`,
      this.plugin,
      ...params,
    )
  },
})

export {pluginControllerFactory}

import type {bud, BudConstructor} from '../..'

export type BudPluginController = {
  bud: bud
  new: (arg0: string, arg1: object) => BudPluginController
  build: () => void
  bindPluginProps: () => void
  ensurePluginProp: (arg0: string, arg1: any) => void
  instantiatePlugin: () => void
  register: () => void
  mergePluginOptions: () => void
  doPluginHook: (hook: string, ...args: any) => void
}
