/**
 * Log server configuration to console.
 */
const logServerConfig = bud =>
  console.log(bud.serverConfig.getStore())

/**
 * Log extension options to console.
 */
const logExtensionOptions = bud =>
  bud.extensions
    .getStore()
    .getValues()
    .forEach(ext => console.log(ext.getStore()))

/**
 * Log OneOfRules to console.
 */
const logOneOfRules = bud =>
  bud.build
    .make()
    .module.rules.pop()
    .oneOf.map(plugin => console.log(plugin))

/**
 * Interesting/useful snippets for local dev.
 */
module.exports = {
  logServerConfig,
  logExtensionOptions,
  logOneOfRules,
}
