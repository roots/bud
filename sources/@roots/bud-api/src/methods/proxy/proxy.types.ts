import type {
  HttpProxy,
  Options as ProxyOptions,
} from '@roots/bud-support/http-proxy-middleware'

import type {Agent} from 'node:http'
import type {ServerOptions as HttpsServerOptions} from 'node:https'
import type {Stream} from 'node:stream'

export interface Options extends HttpProxy.Options {
  agent?: Agent
  auth?: string
  autoRewrite?: boolean
  buffer?: Stream
  changeOrigin?: boolean
  cookieDomainRewrite?:
    | {[oldDomain: string]: string}
    | false
    | string
    | undefined
  cookiePathRewrite?:
    | {[oldDomain: string]: string}
    | false
    | string
    | undefined
  ejectPlugins: boolean
  followRedirects?: boolean
  forward?: ProxyOptions[`forward`]
  headers?: Record<string, string>
  hostRewrite?: string
  ignorePath?: boolean
  localAddress?: string
  logger: Pick<Console, `error` | `info` | `warn`>
  on: ProxyOptions[`on`]
  onProxyReq?: any
  onProxyRes?: any
  pathFilter: Array<string>
  pathRewrite?: HttpProxy.Options[`pathRewrite`]
  plugins: ProxyOptions[`plugins`]
  prependPath?: boolean
  preserveHeaderKeyCase?: boolean
  protocolRewrite?: HttpProxy.Options[`protocolRewrite`]
  proxyTimeout?: number
  /**
   * Not a proxy-party option
   *
   * Used by default `onProxyRes` handler to rewrite the page body
   */
  replacements?: ReplacementCallback | ReplacementTuples
  router?: HttpProxy.Options[`router`]
  secure?: boolean
  selfHandleResponse?: boolean
  ssl?: HttpsServerOptions
  target?: HttpProxy.Options[`target`]
  timeout?: number
  toProxy?: boolean
  ws?: boolean

  xfwd?: boolean
}

export type ReplacementTuples = Array<[string, string]>

export type ReplacementCallback = (
  replacements: ReplacementTuples | undefined,
) => ReplacementTuples

export type OptionsCallback = (
  options: Partial<Options> | undefined,
) => Partial<Options>

export type Parameters = [
  (boolean | number | OptionsCallback | Partial<Options> | string | URL)?,
  (Partial<Options> | ReplacementCallback | ReplacementTuples)?,
]
