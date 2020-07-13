export = plugins
/**
 * Webpack plugins.
 * @typedef {function (config: {options: bud.options, features: bud.features, paths: bud.paths}) => {object}} plugins
 * @param   {{options: bud.options, features: bud.features, paths: bud.paths}} config
 * @param   {options: bud.options} config.options
 * @param   {features: bud.features} config.features
 * @param   {paths: bud.paths} config.paths
 * @returns {object}
 */
declare function plugins({
  options,
  features,
  paths,
}: {
  options: any
  features: any
  paths: any
}): object
declare namespace plugins {
  export {
    basePlugins,
    devPlugins,
    conditionalPlugins,
    plugins,
  }
}
/**
 * Base plugins
 */
type basePlugins = (
  arg0: any,
  arg1: any,
  arg2: any,
  arg3: any,
) => {
  array
}
/**
 * Development plugins
 */
type devPlugins = (
  arg0: any,
  arg1: any,
  arg2: any,
  arg3: any,
) => {
  array
}
/**
 * Conditional plugins
 */
type conditionalPlugins = (
  arg0: any,
  arg1: any,
  arg2: any,
  arg3: any,
) => {
  array
}
/**
 * Webpack plugins.
 */
type plugins = (
  arg0: any,
  arg1: {
    options: any
    features: any
    paths: any
  },
) => {
  object
}
//# sourceMappingURL=plugins.d.ts.map
