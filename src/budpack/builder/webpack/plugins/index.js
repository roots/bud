/** webpack plugin factory */
import {webpackPluginFactory} from './webpackPluginFactory'

/** bud webpack plugin imports */
import {browserSync} from './plugins/browserSync'
import {cleanWebpack} from './plugins/cleanWebpack'
import {copy} from './plugins/copy'
import {define} from './plugins/define'
import {dependencyExtraction} from './plugins/dependencyExtraction'
import {fixStyleOnlyEntries} from './plugins/fixStyleOnlyEntries'
import {hotModuleReplacement} from './plugins/hotModuleReplacement'
import {limitChunkCount} from './plugins/limitChunkCount'
import {miniCssExtract} from './plugins/miniCssExtract'
import {manifest} from './plugins/manifest'
import {provide} from './plugins/provide'
import {writeFile} from './plugins/writeFile'

/**
 * Webpack plugins.
 *
 * @constructor
 * @typedef {function (bud) => {object}} plugins
 * @returns {object}
 */
const plugins = bud => ({
  /**
   * Bud container.
   * @property {bud} bud
   */
  bud,

  /**
   * Core webpack plugins.
   * @property {array<string, function>} plugins
   */
  plugins: [
    ['browser_sync_plugin', browserSync],
    ['clean_webpack_plugin', cleanWebpack],
    ['copy_plugin', copy],
    ['define_plugin', define],
    ['dependency_extraction_plugin', dependencyExtraction],
    ['fix_style_only_entries_plugin', fixStyleOnlyEntries],
    ['hot_module_replacement_plugin', hotModuleReplacement],
    ['manifest_plugin', manifest],
    ['mini_css_extract_plugin', miniCssExtract],
    ['provide_plugin', provide],
    ['write_file_plugin', writeFile],
    ['limit_chunk_count', limitChunkCount],
  ],

  /**
   * Make plugins.
   *
   * @property {function} make
   * @return   {Object}
   */
  make: function () {
    this.doHook('pre')

    this.plugins = this.plugins
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
