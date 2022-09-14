import {isUndefined} from '@roots/bud-support/lodash-es'

import type {Bud} from '../bud'

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

/**
 * Override build with args set via CLI
 *
 * @public
 */
export const buildBefore = async (app: Bud) => {
  if (isset(app.context.args.target) && !target(app)) return

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
