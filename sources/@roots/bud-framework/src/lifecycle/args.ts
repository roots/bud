import {isUndefined} from 'lodash-es'

import type {Bud} from '../bud'
import type {Context} from '../config'

/**
 * --target override
 *
 * @remarks
 * This override should always be first.
 *
 * No reason to handle child instances which are slated
 * to be discarded.
 *
 * @public
 */
const target = (app: Bud) =>
  Object.keys(app.children).reduce((state, name) => {
    return !app.context.args.target.includes(name) ? false : state
  }, true)

/**
 * Returns true if the given value is neither null nor undefined.
 *
 * @public
 */
const isset = (value: unknown): boolean => !isUndefined(value)

export const bootstrap = (context: Context): Context => {
  if (isset(context.args.publicPath))
    context.seed[`build.output.publicPath`] = context.args.publicPath
  else if (isset(context.manifest.bud?.publicPath))
    context.seed[`build.output.publicPath`] =
      context.manifest.bud.publicPath

  if (isset(context.args.input))
    context.seed[`location.@src`] = context.args.input
  else if (isset(context.manifest.bud?.paths?.[`@src`]))
    context.seed[`location.@src`] = context.manifest.bud.paths[`@src`]

  if (isset(context.args.output))
    context.seed[`location.@dist`] = context.args.output
  else if (isset(context.manifest.bud?.paths?.[`@dist`]))
    context.seed[`location.@dist`] = context.manifest.bud.paths[`@dist`]

  if (isset(context.args.storage))
    context.seed[`location.@storage`] = context.args.storage
  else if (isset(context.manifest.bud?.paths?.[`@storage`]))
    context.seed[`location.@storage`] =
      context.manifest.bud.paths[`@storage`]

  if (
    isset(context.manifest.bud?.cache) &&
    isUndefined(context.args.cache)
  )
    context.args.cache = context.manifest.bud.cache

  if (isset(context.args.mode))
    context.seed[`build.mode`] = context.args.mode

  if (isset(context.args.clean))
    context.seed[`feature.clean`] = context.args.clean
  else if (isset(context.manifest.bud?.clean))
    context.seed[`feature.clean`] = context.manifest.bud.clean

  return {...context}
}

/**
 * Override build with args set via CLI
 *
 * @public
 */
export const buildBefore = async (app: Bud) => {
  if (isset(app.context.args.target) && !target(app)) return

  app.log(`processing cli overrides`, app.context.args)

  if (isset(app.context.args.input)) {
    app.setPath(`@src`, app.context.args.input)
  }

  if (isset(app.context.args.esm)) {
    ;(app as any).esm.enable()
  }

  if (isset(app.context.args.immutable)) {
    ;(app as any).cdn.freeze()
  }

  if (isset(app.context.args.output)) {
    app.setPath(`@dist`, app.context.args.output)
  }

  if (isset(app.context.args.publicPath)) {
    app.setPublicPath(app.context.args.publicPath)
  }

  if (isset(app.context.args.manifest)) {
    app.hooks.on(`feature.manifest`, app.context.args.manifest)
  }

  if (isset(app.context.args.cache)) {
    await app.api.call(`persist`, app.context.args.cache)
  }

  if (isset(app.context.args.clean)) {
    app.hooks.on(`build.output.clean`, app.context.args.clean)
  }

  if (isset(app.context.args.devtool)) {
    await app.api.call(`devtool`, app.context.args.devtool)
  }

  if (isset(app.context.args.hash)) {
    await app.api.call(`hash`, app.context.args.hash)
  }

  if (isset(app.context.args.html)) {
    await app.api.call(`template`, app.context.args.html)
  }

  if (isset(app.context.args.minimize)) {
    await app.api.call(`minimize`, app.context.args.minimize)
  }

  if (isset(app.context.args.splitChunks)) {
    await app.api.call(`splitChunks`, app.context.args.splitChunks)
  }
}
