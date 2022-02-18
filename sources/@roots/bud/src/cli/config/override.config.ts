import {Bud} from '../../Bud/index.js'
import {seed} from '../../seed.js'
import {BuildOptions} from '../commands/build.js'

export const config = async (
  app: Bud,
  {location, features, publicPath, target}: BuildOptions,
) => {
  if (location.project !== seed.location.project) {
    app.setPath('project', location.project)
    app.children?.every((_name, child) =>
      child.setPath('project', location.project),
    )
  }

  if (location.src !== seed.location.src) {
    app.setPath('src', location.src)
    app.children?.every((_name, child) =>
      child.setPath('src', location.src),
    )
  }

  if (location.dist !== seed.location.dist) {
    app.setPath('dist', location.dist)
    app.children?.every((_name, child) =>
      child.setPath('dist', location.dist),
    )
  }

  if (publicPath !== seed.build.output.publicPath) {
    app.setPublicPath(publicPath)
    app.children?.every((_name, child) => child.setPublicPath(publicPath))
  }

  if (features.hash !== seed.features.hash) {
    app.api.call('hash', features.hash)
    app.children?.every((_name, child) => child.hash(features.hash))
  }

  if (features.html !== seed.features.html) {
    app.template(features.html)
    app.children?.every((_name, child) => child.template(features.html))
  }

  if (features.manifest !== seed.features.manifest) {
    app.store.set('features.manifest', features.manifest)
    app.children?.every((_name, child) =>
      child.store.set('features.manifest', features.manifest),
    )
  }

  if (features.minimize !== seed.build.optimization.enable) {
    app.api.call('minimize', features.minimize)
    app.children?.every((_name, child) => {
      child.api.call('minimize', features.minimize)
    })
  }

  if (features.splitChunks !== seed.features.splitChunks) {
    app.api.call('splitChunks', features.splitChunks)
    app.children?.every((_name, child) => {
      child.api.call('splitChunks', features.splitChunks)
    })
  }

  if (target?.length) {
    app.children?.getKeys().forEach(name => {
      !target?.includes(name) && app.children?.remove(name)
    })
  }
}
