/**
 * Make a manifest of @wordpress dependencies utilized by entrypoints.
 * @see     https://git.io/JJLxM
 * @example bud.dependencyManifest({outputFormat: 'js', injectPolyfill: false})
 * @typedef {function ({enabled?: boolean, outputFormat: string, combineAssets: boolean, combinedOutputFile: string, useDefaults: boolean, injectPolyfill: boolean, requestToExternal: Function, requestToHandle: Function}) => {bud: import('./../index')}} dependencyManifest
 * @param   {{enabled?: boolean, outputFormat: string, combineAssets: boolean, combinedOutputFile: string, useDefaults: boolean, injectPolyfill: boolean, requestToExternal: Function, requestToHandle: Function}} settings
 * @param   {boolean} settings.enabled - true to enable manifest generation
 * @param   {string}  settings.outputFormat - either 'php' or 'js'
 * @param   {boolean} settings.combineAssets - By default, one manifest is created for each entry point. When this flag is set to true, all information about assets is combined into a single manifest.
 * @param   {string}  settings.combinedOutputFile - This option is useful only when the combineAssets option is enabled. It allows providing a custom output file for the generated manifest.
 * @param   {boolean} settings.useDefaults - Set to false to disable the default WP request handling.
 * @param   {boolean} settings.injectPolyfill - Force @wordpress/polyfill to be included in each entry point's dependency list.
 * @param   {Function} settings.requestToExternal - requestToExternal provided via configuration has precedence over default external handling.
 * @param   {Function} settings.requestToHandle - requestToHandle allows the script handle included in the dependency list to be customized.
 * @return  {import('./../index')} bud
 */
const dependencyManifest = function (
  settings = {enabled: true},
) {
  this.features.dependencyManifest = settings.enabled
  delete settings.enabled

  this.features.dependencyManifest &&
    Object.assign(this.options.dependencyManifest, {
      ...this.options.dependencyManifest,
      ...settings,
    })

  return this
}

export {dependencyManifest}
