import {isUndefined} from '@roots/bud-support/lodash-es'

import type {Bud} from '../bud'

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
export const override = async (app: Bud) => {
  if (app.isRoot && isset(app.context.args.target))
    Object.keys(app.children)
      .filter(name => !app.context.args.target.includes(name))
      .map(name => delete app.children[name])

  if (isset(app.context.args.publicPath))
    app.hooks.on(`build.output.publicPath`, app.context.args.publicPath)
  else if (isset(app.context.manifest?.bud?.publicPath))
    app.hooks.on(
      `build.output.publicPath`,
      app.context.manifest.bud.publicPath,
    )

  if (isset(app.context.args.input))
    app.hooks.on(`location.@src`, app.context.args.input)
  else if (isset(app.context.manifest?.bud?.paths?.[`@src`]))
    app.hooks.on(`location.@src`, app.context.manifest.bud.paths[`@src`])

  if (isset(app.context.args.output))
    app.hooks.on(`location.@dist`, app.context.args.output)
  else if (isset(app.context.manifest?.bud?.paths?.[`@dist`]))
    app.hooks.on(`location.@dist`, app.context.manifest.bud.paths[`@dist`])

  if (isset(app.context.args.storage))
    app.hooks.on(`location.@storage`, app.context.args.storage)
  else if (isset(app.context.manifest?.bud?.paths?.[`@storage`]))
    app.hooks.on(
      `location.@storage`,
      app.context.manifest?.bud.paths[`@storage`],
    )

  if (isset(app.context.args.mode))
    app.hooks.on(`build.mode`, app.context.args.mode)

  if (isset(app.context.args.clean))
    app.hooks.on(`feature.clean`, app.context.args.clean)
  else if (isset(app.context.manifest?.bud?.clean))
    app.hooks.on(`feature.clean`, app.context.manifest?.bud.clean)

  if (isset(app.context.args.minimize))
    app.api.call(`minimize`, app.context.args.minimize)

  if (isset(app.context.args.html)) {
    await app.api.call(`template`)
  }

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
