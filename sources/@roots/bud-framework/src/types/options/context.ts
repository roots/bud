import type {Readable, Writable} from 'node:stream'

import type {InspectResult} from '@roots/filesystem/filesystem'

import type {Bud} from '../../bud.js'
import type {Logger} from '../services/logger/index.js'

export interface BudContext {
  label: string
  basedir: string
  mode: 'development' | 'production'
  bud: Record<string, any>
  env: Record<string, string | undefined>
  args: Partial<{
    basedir?: string
    browser?: string | boolean
    cache?: `filesystem` | `memory` | true | false
    ci?: boolean
    clean?: boolean
    debug?: boolean
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
    discovery?: boolean
    dry?: boolean
    output?: string
    editor?: string | boolean
    esm?: boolean
    filter?: Array<string>
    flush?: boolean
    hash?: boolean
    html?: boolean | string
    immutable?: boolean
    indicator?: boolean
    input?: string
    log?: boolean
    manifest?: boolean
    minimize?: boolean
    mode?: `production` | `development`
    modules?: string
    notify?: boolean
    overlay?: boolean
    publicPath?: string
    reload?: boolean
    runtime?: `single` | `multiple` | boolean
    splitChunks?: boolean
    storage?: string
    target?: Array<string>
    verbose?: boolean
  }>
  root?: Bud
  dependsOn?: Array<string>
  manifest?: Record<string, any>
  services?: Array<string>
  config?: Record<string, File>
  extensions?: {
    builtIn?: Array<string>
    discovered?: Array<string>
  }
  logger?: Logger
}

export interface CommandContext extends BudContext {
  stdin: Readable
  stdout: Writable
  stderr: Writable
  colorDepth: number
}

export type {BudContext as Context}

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
  md5: string
  mode: number
}
