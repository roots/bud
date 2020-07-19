/** webpack plugin factory */
import {webpackPluginFactory} from './webpackPluginFactory'

/**
 * Webpack plugins.
 *
 * @constructor
 * @type {function (bud) => {object}} plugins
 * @returns {object}
 */
const plugins = bud => ({
  /**
   * Bud container.
   * @property {bud} bud
   */
  bud,

  /**
   * Webpack plugins
   * @property {array} pluginQueue
   */
  pluginQueue: bud.webpackPlugins,

  /**
   * Make plugins.
   *
   * @property {function} make
   * @return   {Object}
   */
  make: function () {
    this.doHook('pre')

    this.plugins = this.pluginQueue
      .map(plugin =>
        webpackPluginFactory(plugin, this.bud).build(),
      )
      .filter(plugin => plugin !== undefined)

    this.doHook('post')

    return {
      plugins: this.plugins,
    }
  },

  /**
   * Call a bud hook
   *
   * @property {function} doPreHook
   * @param    {string} name
   * @return   {void}
   */
  doHook: function (name) {
    this.bud.hooks.call(
      `${name}_webpack_plugins`,
      this.plugins,
      this.bud,
    )
  },
})

export {plugins}
