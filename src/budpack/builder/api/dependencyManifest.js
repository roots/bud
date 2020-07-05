/**
 * Make API: dependencyManifest
 *
 * @type   {func.<makeDependencyManifest>}
 * @param  {object.<bud>}
 * @return {void}
 */
const makeDependencyManifest = bud => {
  /**
   * Make a manifest of @wordpress dependencies utilized by entrypoints.
   *
   * @typedef {func.<dependencyManifest>} dependencyManifest
   * @param   {object} settings
   * @return  {object.<bud>} bud instance
   */
  const dependencyManifest = (settings = {}) => {
    !settings
      ? bud.features.dependencyManifest = false
      : bud.options.dependencyManifest = {
        ...bud.options.dependencyManifest,
        ...settings,
      }

    return bud
  }

  return dependencyManifest
}

export {makeDependencyManifest}
