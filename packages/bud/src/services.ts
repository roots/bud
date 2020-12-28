import {Build} from '@roots/bud-build'
import {Cache} from '@roots/bud-cache'
import {Compiler} from '@roots/bud-compiler'
import {Env, Mode} from '@roots/bud-framework'
import {Extensions} from '@roots/bud-extensions'
import {FileContainer, FileSystem} from '@roots/filesystem'
import {Hooks} from '@roots/bud-hooks'
import {CLI} from '@roots/bud-cli'
import {Server} from '@roots/bud-server'

export const services: {
  [key: string]: unknown
} = {
  build: Build,
  cache: Cache,
  cli: CLI,
  compiler: Compiler,
  disk: FileSystem,
  env: Env,
  extensions: Extensions,
  fs: FileContainer,
  hooks: Hooks,
  mode: Mode,
  server: Server,
}
