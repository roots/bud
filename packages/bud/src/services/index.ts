import {Compiler} from '@roots/bud-compiler'
import {Server} from '@roots/bud-server'
import {Build} from '@roots/bud-build'
import {Extensions} from '@roots/bud-extensions'
import {Hooks} from '@roots/bud-hooks'
import {Mode} from '@roots/bud-framework'
import {FileSystem, FileContainer} from '@roots/filesystem'
import {Build as CLI} from '@roots/bud-cli'
import type {Services} from '@roots/bud-typings'

export const services: Services = function () {
  return {
    disk: [FileSystem],
    fs: [FileContainer],
    build: [Build, {bud: this}],
    mode: [Mode, {bud: this}],
    hooks: [Hooks, {logger: this.logger}],
    compiler: [Compiler, {bud: this}],
    server: [Server, {bud: this}],
    extensions: [Extensions, {bud: this}],
    cli: [CLI, {bud: this}],
  }
}
