import {join} from 'path'

/**
 * ## bud.resolve
 *
 * Resolve a module.
 *
 * ```js
 * bud.resolve('scripts/app.js')
 * ```
 */
const resolve = function (moduleName: string): string {
  return require.resolve(join(this.state.paths.framework, 'node_modules', moduleName))
}

export {resolve}
