import {Compiler} from '@roots/bud-compiler'
import {FileContainer, FileSystem} from '@roots/filesystem'

import {App} from '@roots/bud-cli'
import {Build} from '../Build'
import {Hooks} from '../Hooks'
import {Extensions} from '../Extensions'
import {Features} from '../Features'
import {Mode} from '../Mode'
import {Server} from '@roots/bud-server'

export interface Services {
  (this: Framework.Bud): {
    [key: string]: [
      service: NewableFunction,
      dependenies?: Framework.Index<any>,
    ]
  }
}

export const services: Services = function (
  this: Framework.Bud,
) {
  return {
    disk: [FileSystem],
    fs: [FileContainer],
    features: [Features],
    build: [Build, {bud: this}],
    mode: [Mode, {bud: this}],
    hooks: [Hooks, {logger: this.logger}],
    compiler: [Compiler, {bud: this}],
    server: [Server, {bud: this}],
    extensions: [Extensions, {bud: this}],
    cli: [App, {bud: this}],
  }
}
