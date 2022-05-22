import {lodash} from '@roots/bud-support'

import {BuildCommand} from '../commands/build.js'

const {isUndefined} = lodash

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

export const config = async (command: BuildCommand) => {
  !isUndefined(command.target) && target(command)

  if (!isUndefined(command.src)) {
    command.app.setPath('@src', command.src)
    Object.entries(command.app.children).map(([_name, child]) =>
      child.setPath('@src', command.src),
    )
  }

  if (!isUndefined(command.buildHttp)) {
    command.app.http.enable()
    Object.entries(command.app.children).map(([_name, child]) => {
      child.http.enable()
    })
  }

  if (!isUndefined(command.esm)) {
    command.app.esm.enable()
    Object.entries(command.app.children).map(([_name, child]) =>
      child.esm.enable(),
    )
  }

  if (!isUndefined(command.freeze)) {
    command.app.http.freeze()
    Object.entries(command.app.children).map(([_name, child]) =>
      child.http.freeze(),
    )
  }

  if (!isUndefined(command.dist)) {
    command.app.setPath('@dist', command.dist)
    Object.entries(command.app.children).map(([_name, child]) =>
      child.setPath('@dist', command.dist),
    )
  }

  if (!isUndefined(command.publicPath)) {
    command.app.setPublicPath(command.publicPath)
    Object.entries(command.app.children).map(([_name, child]) =>
      child.setPublicPath(command.publicPath),
    )
  }

  if (!isUndefined(command.manifest)) {
    command.app.hooks.on('feature.manifest', command.manifest)
    Object.entries(command.app.children).map(([_name, child]) =>
      child.hooks.on('feature.manifest', command.manifest),
    )
  }

  if (!isUndefined(command.cache)) {
    command.app.api.call(`persist`, command.cache)
    await Promise.all(
      Object.entries(command.app.children).map(async ([_name, child]) => {
        await child.api.call(`persist`, command.cache)
      }),
    )
  }

  if (!isUndefined(command.clean)) {
    command.app.hooks.on('build.output.clean', true)
    Object.entries(command.app.children).map(([_name, child]) => {
      child.hooks.on('build.output.clean', true)
    })
  }

  if (!isUndefined(command.devtool)) {
    await command.app.api.call('devtool', command.devtool)
    await Promise.all(
      Object.entries(command.app.children).map(async ([_name, child]) => {
        await child.api.call('devtool', command.devtool)
      }),
    )
  }

  if (!isUndefined(command.hash)) {
    await command.app.api.call('hash', command.hash)
    await Promise.all(
      Object.values(command.app.children).map(async child => {
        await child.api.call('hash', command.hash)
      }),
    )
  }

  if (!isUndefined(command.html)) {
    await command.app.api.call('template', command.html)
    await Promise.all(
      Object.entries(command.app.children).map(async ([_name, child]) => {
        await child.api.call('template', command.html)
      }),
    )
  }

  if (!isUndefined(command.minimize)) {
    await command.app.api.call('minimize', command.minimize)
    await Promise.all(
      Object.values(command.app.children).map(async child => {
        await child.api.call('minimize', command.minimize)
      }),
    )
  }

  if (!isUndefined(command.splitChunks)) {
    await command.app.api.call('splitChunks', command.splitChunks)
    await Promise.all(
      Object.values(command.app.children).map(async child => {
        await child.api.call('splitChunks', command.splitChunks)
      }),
    )
  }
}
