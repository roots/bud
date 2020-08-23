import type {Bud} from '..'
import {ExtensionRepository} from '../repositories/plugins'

type UseExtension = (this: Bud, plugin: any[]) => Bud

const use: UseExtension = function (
  this: Bud,
  extensions: ExtensionRepository,
): Bud {
  extensions.map(extension => {
    this.extensions(this, extension).build()
  })

  return this
}

export {use}
export type {UseExtension}
