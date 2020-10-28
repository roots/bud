import {Compiler} from '@roots/bud-compiler'
import {FileContainer, FileSystem} from '@roots/filesystem'

import {App} from '@roots/bud-cli'
import {
  Build,
  Hooks,
  Extensions,
  Features,
  Mode,
} from '@roots/bud-framework'
import {Server} from '@roots/bud-server'

export const services: Framework.Services = function (
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
