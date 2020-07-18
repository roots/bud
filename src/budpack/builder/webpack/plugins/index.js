/**
 * Bud controller
 */
import {pluginController} from './pluginController'

/**
 * Plugins
 */
import {cleanWebpack} from './plugins/cleanWebpack'
import {miniCssExtract} from './plugins/miniCssExtract'
import {manifest} from './plugins/manifest'
import {fixStyleOnlyEntries} from './plugins/fixStyleOnlyEntries'
import {dependencyExtraction} from './plugins/dependencyExtraction'
import {browserSync} from './plugins/browserSync'
import {hotModuleReplacement} from './plugins/hotModuleReplacement'
import {writeFile} from './plugins/writeFile'
import {provide} from './plugins/provide'
import {define} from './plugins/define'
import {copy} from './plugins/copy'
import {limitChunkCount} from './plugins/limitChunkCount'

/**
 * Webpack plugins
 *
 * @typedef {function (bud: object) => {object}} plugins
 * @returns {object}
 */
const plugins = bud => ({
  bud,
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
  make: function () {
    const bud = this.bud
    this.bud.hooks.call('pre_webpack_plugins', this.plugins)

    this.plugins = this.plugins
      .map(plugin => pluginController(plugin, bud).build())
      .filter(plugin => plugin !== null)

    this.bud.hooks.call(
      'post_webpack_plugins',
      this.plugins,
    )

    return {
      plugins: this.plugins,
    }
  },
})

export {plugins}
