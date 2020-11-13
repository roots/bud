import {Bud} from '@roots/bud-typings'
import {Compiler} from '@roots/bud-compiler'
import {Server} from '@roots/bud-server'
import {Build} from '@roots/bud-build'
import {FileSystem, FileContainer} from '@roots/filesystem'
import {Runner} from '@roots/bud-cli'
import {Cache} from '@roots/bud-cache'
import {Hooks} from '@roots/bud-hooks'
import {Extensions} from '@roots/bud-extensions'

export const fs = function (this: Bud.Contract): void {
  Object.assign(this, {
    fs: new FileContainer({}),
  })
}

export const disk = function (this: Bud.Contract): void {
  Object.assign(this, {
    disk: new FileSystem({}),
  })
}

export const build = function (this: Bud.Contract): void {
  Object.assign(this, {
    build: new Build(this),
  })
}

export const hooks = function (this: Bud.Contract): void {
  Object.assign(this, {
    hooks: new Hooks({logger: this.logger}),
  })
}

export const compiler = function (this: Bud.Contract): void {
  Object.assign(this, {
    compiler: new Compiler(this),
  })
}

export const server = function (this: Bud.Contract): void {
  Object.assign(this, {
    server: new Server(this),
  })
}

export const cache = function (this: Bud.Contract): void {
  Object.assign(this, {
    cache: new Cache(this),
  })
}

export const extensions = function (this: Bud.Contract): void {
  Object.assign(this, {
    extensions: new Extensions(this),
  })
}

export const cli = function (this: Bud.Contract): void {
  Object.assign(this, {
    cli: new Runner(this),
  })
}
