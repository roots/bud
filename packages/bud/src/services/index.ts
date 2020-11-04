import {Compiler} from '@roots/bud-compiler'
import {Server} from '@roots/bud-server'
import {
  Build,
  Hooks,
  Extensions,
  Features,
  Mode,
} from '@roots/bud-framework'
import * as Teletype from '@roots/bud-cli'
import {FileSystem, FileContainer} from '@roots/filesystem'

/**
 * Services
 */
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
    cli: [Teletype.Build, {bud: this}],
  }
}
