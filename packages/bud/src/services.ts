import {Build} from '@roots/bud-build'
import {Cache} from '@roots/bud-cache'
import {Compiler} from '@roots/bud-compiler'
import {Extensions} from '@roots/bud-extensions'
import {Hooks} from '@roots/bud-hooks'
import {Runner} from '@roots/bud-cli'
import {Server} from '@roots/bud-server'

export const services: {
  [key: string]: unknown
} = {
  build: Build,
  cache: Cache,
  cli: Runner,
  compiler: Compiler,
  extensions: Extensions,
  hooks: Hooks,
  server: Server,
}
