import {isNull, isUndefined} from 'lodash-es'

import type {BuildCommand} from '../commands/build.js'

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
const target = (command: BuildCommand) =>
  Object.keys(command.app.children).forEach(name => {
    !command.target.includes(name) && delete command.app.children[name]
  })

/**
 * Returns true if the given value is neither null nor undefined.
 *
 * @public
 */
const isset = (value: unknown): boolean =>
  !isNull(value) && !isUndefined(value)

export const config = async (command: BuildCommand) => {
  isset(command.target) && target(command)

  if (isset(command.input)) {
    command.app.setPath(`@src`, command.input)
  }

  if (isset(command.esm)) {
    command.app.esm.enable()
    Object.entries(command.app.children).map(([_name, child]) =>
      child.esm.enable(),
    )
  }

  if (isset(command.immutable)) {
    command.app.cdn.freeze()
    Object.entries(command.app.children).map(([_name, child]) =>
      child.cdn.freeze(),
    )
  }

  if (isset(command.dist)) {
    command.app.setPath(`@dist`, command.dist)
    Object.entries(command.app.children)
  }

  if (isset(command.publicPath)) {
    command.app.setPublicPath(command.publicPath)
    Object.entries(command.app.children).map(([_name, child]) =>
      child.setPublicPath(command.publicPath),
    )
  }

  if (isset(command.manifest)) {
    command.app.hooks.on(`feature.manifest`, command.manifest)
    Object.entries(command.app.children).map(([_name, child]) =>
      child.hooks.on(`feature.manifest`, command.manifest),
    )
  }

  if (isset(command.cache)) {
    await command.app.api.call(`persist`, command.cache)
    await Promise.all(
      Object.entries(command.app.children).map(async ([_name, child]) => {
        await child.api.call(`persist`, command.cache)
      }),
    )
  }

  if (isset(command.clean)) {
    command.app.hooks.on(`build.output.clean`, command.clean)
    Object.entries(command.app.children).map(([_name, child]) => {
      child.hooks.on(`build.output.clean`, command.clean)
    })
  }

  if (isset(command.devtool)) {
    await command.app.api.call(`devtool`, command.devtool)
    await Promise.all(
      Object.entries(command.app.children).map(async ([_name, child]) => {
        await child.api.call(`devtool`, command.devtool)
      }),
    )
  }

  if (isset(command.hash)) {
    await command.app.api.call(`hash`, command.hash)
    await Promise.all(
      Object.values(command.app.children).map(async child => {
        await child.api.call(`hash`, command.hash)
      }),
    )
  }

  if (isset(command.html)) {
    await command.app.api.call(`template`, command.html)
    await Promise.all(
      Object.entries(command.app.children).map(async ([_name, child]) => {
        await child.api.call(`template`, command.html)
      }),
    )
  }

  if (isset(command.minimize)) {
    await command.app.api.call(`minimize`, command.minimize)
    await Promise.all(
      Object.values(command.app.children).map(async child => {
        await child.api.call(`minimize`, command.minimize)
      }),
    )
  }

  if (isset(command.splitChunks)) {
    await command.app.api.call(`splitChunks`, command.splitChunks)
    await Promise.all(
      Object.values(command.app.children).map(async child => {
        await child.api.call(`splitChunks`, command.splitChunks)
      }),
    )
  }
}
