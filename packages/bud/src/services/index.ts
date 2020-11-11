import type {Service} from '@roots/bud-typings'
import {Compiler} from '@roots/bud-compiler'
import {Server} from '@roots/bud-server'
import {Build} from '@roots/bud-build'
import {Extensions} from '@roots/bud-extensions'
import {Hooks} from '@roots/bud-hooks'
import {Mode} from '@roots/bud-framework'
import {FileSystem, FileContainer} from '@roots/filesystem'
import {Runner} from '@roots/bud-cli'
import {Cache} from '@roots/bud-cache'

export const fs: Service = () => new FileContainer({})
export const disk: Service = () => new FileSystem({})
export const build: Service = bud => new Build(bud)
export const mode: Service = bud => new Mode(bud)
export const hooks: Service = ({logger}) => new Hooks({logger})
export const compiler: Service = bud => new Compiler(bud)
export const server: Service = bud => new Server(bud)
export const cache: Service = bud => new Cache(bud)
export const extensions: Service = bud => new Extensions(bud)
export const cli: Service = bud => new Runner(bud)
