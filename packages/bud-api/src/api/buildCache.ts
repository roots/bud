import {Bud} from '@roots/bud-typings'

export const buildCache: BuildCache = function (path?) {
  if (path) {
    this.config.set('recordsPath', path)
    this.extensions
      .get('webpack-config-dump-plugin')
      .set('outputPath', this.project('storage/bud'))
  }

  this.features.set('buildCache', true)

  return this
}

export type BuildCache<T = Bud> = (this: T, path?: string) => T
