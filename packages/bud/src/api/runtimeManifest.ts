import {BudInterface} from '../'

/**
 * Inline common scripts.
 *
 * ```js
 * bud.runtimeManifest('runtime')
 * ```
 */
export type RuntimeManifest = (
  this: BudInterface,
  args?: {
    name: string
  },
) => BudInterface

const runtimeManifest: RuntimeManifest = function (args?) {
  this.features.set('runtimeChunk', true)
  args?.name &&
    this.options.set(
      'webpack.optimization.runtimeChunk.name',
      args.name,
    )

  return this
}

export {runtimeManifest as default}
