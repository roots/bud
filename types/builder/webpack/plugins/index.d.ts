/**
 * Webpack plugins.
 */
export type plugins = (
  arg0: any,
  arg1: {
    options: any
    features: any
    paths: any
  },
) => {
  object
}
/**
 * Webpack plugins.
 *
 * @typedef {function (config: {options: bud.options, features: bud.features, paths: bud.paths}) => {object}} plugins
 * @param   {{options: bud.options, features: bud.features, paths: bud.paths}} config
 * @param   {options: bud.options} config.options
 * @param   {features: bud.features} config.features
 * @param   {paths: bud.paths} config.paths
 * @returns {object}
 */
export function plugins({
  options,
  features,
  paths,
}: {
  options: any
  features: any
  paths: any
}): object
//# sourceMappingURL=index.d.ts.map
