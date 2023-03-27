import type {Readable, Writable} from 'node:stream'

import type {InspectResult} from '@roots/filesystem/filesystem'

import type {Bud} from '../../bud.js'
import type {Logger} from '../services/logger/index.js'

export interface Context {
  label: string
  basedir: string
  mode: 'development' | 'production'
  bud: Record<string, any>
  files: Record<string, File>
  env: Record<string, string | undefined>
  extensions: {
    builtIn: Array<string>
    discovered: Array<string>
  }
  manifest: Record<string, any>
  services: Array<string>
  logger: Logger
  root?: Bud | undefined
  dependsOn?: Array<string> | undefined
}

export interface CLIContext extends Context {
  stdin: Readable
  stdout: Writable
  stderr: Writable
  colorDepth: number
}

export interface CommandContext extends CLIContext {
  args: Partial<{
    basedir: string | undefined
    browser: string | boolean | undefined
    cache: `filesystem` | `memory` | true | false | undefined
    ci: boolean | undefined
    clean: boolean | undefined | undefined
    debug: boolean | undefined
    devtool?:
      | false
      | `eval`
      | `eval-cheap-source-map`
      | `eval-cheap-module-source-map`
      | `eval-source-map`
      | `cheap-source-map`
      | `cheap-module-source-map`
      | `source-map`
      | `inline-cheap-source-map`
      | `inline-cheap-module-source-map`
      | `inline-source-map`
      | `eval-nosources-cheap-source-map`
      | `eval-nosources-cheap-modules-source-map`
      | `eval-nosources-source-map`
      | `inline-nosources-cheap-source-map`
      | `inline-nosources-cheap-module-source-map`
      | `inline-nosources-source-map`
      | `nosources-cheap-source-map`
      | `nosources-cheap-module-source-map`
      | `hidden-nosources-cheap-source-map`
      | `hidden-nosources-cheap-module-source-map`
      | `hidden-nosources-source-map`
      | `hidden-cheap-source-map`
      | `hidden-cheap-module-source-map`
      | `hidden-source-map`
      | undefined
    discover: boolean | undefined
    dry: boolean | undefined
    output: string | undefined
    editor: string | boolean | undefined
    esm: boolean | undefined
    filter: Array<string> | undefined
    force: boolean | undefined
    hash: boolean | undefined
    hot: boolean | undefined
    html: boolean | string | undefined
    immutable: boolean | undefined
    indicator: boolean | undefined
    input: string | undefined
    log: boolean | undefined
    manifest: boolean | undefined
    minimize: boolean | undefined
    modules: string | undefined
    notify: boolean | undefined
    overlay: boolean | undefined
    publicPath: string | undefined
    port: string | undefined
    proxy: string | undefined
    reload: boolean | undefined
    runtime: `single` | `multiple` | boolean | undefined
    splitChunks: boolean | undefined
    storage: string | undefined
    target: Array<string> | undefined
    use: Array<string> | undefined
    verbose: boolean | undefined
  }>
  bin?: `node` | `ts-node` | `bun`
}

export interface File extends Omit<InspectResult, `type`> {
  name: string
  path: string
  bud: boolean
  local: boolean
  dynamic: boolean
  extension: string | null
  type: `production` | `development` | `base`
  module: any
  file: boolean
  dir: boolean
  symlink: boolean
  size: number
  sha1: string
  mode: number
}
