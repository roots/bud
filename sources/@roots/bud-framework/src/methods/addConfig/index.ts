import type {Bud} from '@roots/bud-framework'

import {basename, extname} from 'node:path'

import Configuration from '@roots/bud-framework/configuration'
import {BudError} from '@roots/bud-support/errors'

/**
 * Process user configurations
 */
export interface addConfig {
  (path: string): Bud
}

export const addConfig: addConfig = function (this: Bud, path: string) {
  const file = {
    ext: extname(path),
    module: [`.json`, `.yaml`, `.yml`].includes(extname(path))
      ? async () => await this.fs.read(path)
      : async () => await this.module.import(path, import.meta.url),
    name: basename(path),
    path: this.relPath(path),
  }

  this.promise(async bud => {
    await new Configuration(bud).run(file).catch(error => {
      throw BudError.normalize(
        `Error parsing ${file.name}: ${BudError.normalize(error).message}`,
        {
          file,
          origin: error,
        },
      )
    })
  })

  return this
}
