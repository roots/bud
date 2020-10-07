import type Bud from '../../Bud'
import {DllPlugin, DllReferencePlugin} from 'webpack'

/**
 * DLL Plugin
 */
const dll: Framework.Extension.Factory = (
  bud: Bud,
): Framework.Extension => ({
  /**
   * Bud instance.
   *
   * @param {Bud} bud
   */
  bud,

  /**
   * Plugin options.
   *
   * @type {Framework.Extension.Options}
   */
  options: {
    context: bud.store['build'].get('context'),
    name: '[name]-[hash]',
    path: bud.dist('library/[name].json'),
  },

  /**
   * Make webpack plugin.
   *
   * @return {DllPlugin}
   */
  make: function (): DllPlugin {
    return new DllPlugin(this.options)
  },

  /**
   * Conditions for plugin
   *
   * @return {boolean}
   */
  when: function (): boolean {
    const {library} = this.bud.store['build'].get('entry')
    const enabled = this.bud.store['features'].enabled('library')

    return library && enabled
  },
})

/**
 * DLL Reference Plugin
 */
const dllReference: Framework.Extension.Factory = bud => ({
  bud,

  options: {
    context: bud.store['build'].get('context'),
    manifest: bud.dist('library/manifest.json'),
    scope: 'xyz',
    sourceType: 'commonjs2',
  },

  make: function (): DllReferencePlugin {
    return new DllReferencePlugin(this.options)
  },

  when: function () {
    const {library} = this.bud.store['build'].get('entry')
    const enabled = this.bud.store['features'].enabled('library')
    const manifestExists = bud.fs.exists(
      'dist/library/manifest.json',
    )

    return library && enabled && manifestExists
  },
})

export {dll, dllReference}
