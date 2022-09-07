import type {Readable, Writable} from 'node:stream'

import type {Bud} from '../../bud'

export interface BaseContext {
  label: string
  root?: Bud
  basedir: string
  bud: Record<string, any>
  manifest?: Record<string, any>
  mode: 'development' | 'production'
  args: Partial<{
    basedir: string
    browser: string | boolean
    cache: `filesystem` | `memory` | true | false
    ci: boolean
    clean: boolean
    debug: boolean
    devtool:
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
    discovery: boolean
    dry: boolean
    output: string
    editor: boolean
    esm: boolean
    flush: boolean
    hash: boolean
    html: boolean | string
    immutable: boolean
    indicator: boolean
    input: string
    level: Array<Boolean>
    log: boolean
    manifest: boolean
    minimize: boolean
    mode: `production` | `development`
    modules: string
    notify: boolean
    overlay: boolean
    publicPath: string
    reload: boolean
    splitChunks: boolean
    storage: string
    target: Array<string>
  }>
  config: Record<
    string,
    {
      name: string
      path: string
      bud: boolean
      local: boolean
      dynamic: boolean
      extension: string | null
      type: `production` | `development` | `base`
      module: any
    }
  >
  extensions: Array<string>
  services: Array<string>
  env: Record<string, string | undefined>
}

export interface InstanceContext extends BaseContext {
  stdin: Readable
  stdout: Writable
  stderr: Writable
  colorDepth: number
}

export type BaseOverrides = {
  [K in keyof BaseContext]?: Partial<BaseContext[K]>
}

export type InstanceOverrides = {
  [K in keyof InstanceContext]?: InstanceContext[K]
}

export type Context = BaseContext & InstanceContext
export type Overrides = BaseOverrides & InstanceOverrides
