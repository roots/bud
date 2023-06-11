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
  cookieDomainRewrite?: Record<string, string>
  cookiePathRewrite?: Record<string, string>
  ejectPlugins?: boolean
  followRedirects?: boolean
  forward?: ProxyOptions[`forward`]
  headers?: Record<string, string>
  hostRewrite?: string
  ignorePath?: boolean
  localAddress?: string
  logger?: Pick<Console, `error` | `info` | `warn`>
  on?: ProxyOptions[`on`]
  onProxyReq?: any
  onProxyRes?: any
  pathFilter?: Array<string>
  pathRewrite?: Record<string, string>
  plugins?: ProxyOptions[`plugins`]
  prependPath?: boolean
  preserveHeaderKeyCase?: boolean
  protocolRewrite?: `http` | `https`
  proxyTimeout?: number
  /**
   * Not a proxy-party option
   *
   * Used by default `onProxyRes` handler to rewrite the page body
   */
  replacements?: ReplacementCallback | ReplacementTuples
  router?: Record<string, string | URL>
  secure?: boolean
  selfHandleResponse?: boolean
  ssl?: HttpsServerOptions
  target?: URL
  timeout?: number
  toProxy?: boolean
  ws?: boolean

  xfwd?: boolean
}

export type ReplacementTuples = Array<[string, string]>

export type ReplacementCallback = (
  replacements: ReplacementTuples | undefined,
) => ReplacementTuples

export type OptionsCallback = (options: Options | undefined) => Options

export type Parameters = [
  (boolean | number | Options | OptionsCallback | string | URL)?,
  (Options | ReplacementCallback | ReplacementTuples)?,
]
