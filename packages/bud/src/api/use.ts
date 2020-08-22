import type {Bud} from '..'
import {ExtensionRepository} from '../repositories/adapters'

type UseExtension = (this: Bud, plugin: any[]) => Bud

const use: UseExtension = function (
  this: Bud,
  extensions: ExtensionRepository,
): Bud {
  extensions.map(extension => {
    this.adapters.controller(this, extension).build()
  })

  return this
}

export {use}
export type {UseExtension}
