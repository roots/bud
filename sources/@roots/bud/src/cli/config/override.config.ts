import {lodash} from '@roots/bud-support'

import {BuildCommand} from '../commands/build.js'

const {isUndefined} = lodash

export const config = async (command: BuildCommand) => {
  if (!isUndefined(command.target)) {
    command.app.children?.getKeys().forEach(name => {
      !command.target.includes(name) && command.app.children?.remove(name)
    })
  }

  if (!isUndefined(command.src)) {
    command.app.setPath('@src', command.src)
    command.app.children?.every((_name, child) =>
      child.setPath('@src', command.src),
    )
  }

  if (!isUndefined(command.dist)) {
    command.app.setPath('@dist', command.dist)
    command.app.children?.every((_name, child) =>
      child.setPath('@dist', command.dist),
    )
  }

  if (!isUndefined(command.publicPath)) {
    command.app.setPublicPath(command.publicPath)
    command.app.children?.every((_name, child) =>
      child.setPublicPath(command.publicPath),
    )
  }

  if (!isUndefined(command.manifest)) {
    command.app.store.set('features.manifest', command.manifest)
    command.app.children?.every((_name, child) =>
      child.store.set('features.manifest', command.manifest),
    )
  }

  if (!isUndefined(command.cache)) {
    command.app.api.call(`persist`, command.cache)
    await Promise.all(
      command.app.children.getEntries().map(async ([_name, child]) => {
        await child.app.api.call(`persist`, command.cache)
      }),
    )
  }

  if (!isUndefined(command.clean)) {
    command.app.hooks.on('build.output.clean', true)
    command.app.children.getEntries().map(([_name, child]) => {
      child.hooks.on('build.output.clean', true)
    })
  }

  if (!isUndefined(command.devtool)) {
    await command.app.api.call('devtool', command.devtool)
    await Promise.all(
      command.app.children.getEntries().map(async ([_name, child]) => {
        await child.api.call('devtool', command.devtool)
      }),
    )
  }

  if (!isUndefined(command.hash)) {
    await command.app.api.call('hash', command.hash)
    await Promise.all(
      command.app.children.getEntries().map(async ([_name, child]) => {
        await child.api.call('hash', command.hash)
      }),
    )
  }

  if (!isUndefined(command.html)) {
    await command.app.api.call('template', command.html)
    await Promise.all(
      command.app.children.getEntries().map(async ([_name, child]) => {
        await child.api.call('template', command.html)
      }),
    )
  }

  if (!isUndefined(command.minimize)) {
    await command.app.api.call('minimize', command.minimize)
    await Promise.all(
      command.app.children.getEntries().map(async ([_name, child]) => {
        await child.api.call('minimize', command.minimize)
      }),
    )
  }

  if (!isUndefined(command.splitChunks)) {
    await command.app.api.call('splitChunks', command.splitChunks)
    await Promise.all(
      command.app.children.getEntries().map(async ([_name, child]) => {
        await child.api.call('splitChunks', command.splitChunks)
      }),
    )
  }
}
