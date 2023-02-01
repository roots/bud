import type {ListenOptions} from 'node:net'

import type {WatchOptions} from '@roots/bud-support/chokidar'

import type {Bud} from '../../bud.js'
import type * as Server from '../services/server/index.js'

export interface Sync {
  listenOptions: ListenOptions

  /**
   * On listening callback
   */
  onListening: Server.Connection['onListening']

  /**
   * Request callback
   */
  onRequest: Server.Connection['onRequest']

  /**
   * Error callback
   */
  onError: Server.Connection['onError']

  /**
   * Dev server connection options
   */
  options: Server.Options

  /**
   * Server URL
   */
  url: URL

  /**
   * External URL
   */
  publicUrl: URL

  /**
   * Proxy URL
   */
  proxyUrl: URL

  /**
   * Public proxy URL
   */
  publicProxyUrl: URL

  /**
   * Files which trigger a full browser reload
   */
  'watch.files': Set<string>

  /**
   * FS.Watcher options
   */
  'watch.options': WatchOptions

  /**
   * Scripts included in dev builds
   */
  'client.scripts': Set<(app: Bud) => string>
  'client.standalone': boolean
  'client.path': string
  'client.dist': string

  /**
   * Enabled middleware
   */
  'middleware.enabled': Array<keyof Server.Middleware.Available>

  'middleware.dev.options': Server.Middleware.Available['dev']['options']
  'middleware.dev.options.headers': Server.Middleware.Available['dev']['options']['headers']
  'middleware.dev.options.methods': Server.Middleware.Available['dev']['options']['methods']
  'middleware.dev.options.index': Server.Middleware.Available['dev']['options']['index']
  'middleware.dev.options.publicPath': Server.Middleware.Available['dev']['options']['publicPath']
  'middleware.dev.options.writeToDisk': Server.Middleware.Available['dev']['options']['writeToDisk']

  'middleware.proxy.options': Server.Middleware.Available['proxy']['options']
  'middleware.proxy.options.agent': Server.Middleware.Available['proxy']['options']['agent']
  'middleware.proxy.options.auth': Server.Middleware.Available['proxy']['options']['auth']
  'middleware.proxy.options.autoRewrite': Server.Middleware.Available['proxy']['options']['autoRewrite']
  'middleware.proxy.options.buffer': Server.Middleware.Available['proxy']['options']['buffer']
  'middleware.proxy.options.changeOrigin': Server.Middleware.Available['proxy']['options']['changeOrigin']
  'middleware.proxy.options.cookieDomainRewrite': Server.Middleware.Available['proxy']['options']['cookieDomainRewrite']
  'middleware.proxy.options.cookiePathRewrite': Server.Middleware.Available['proxy']['options']['cookiePathRewrite']
  'middleware.proxy.options.ejectPlugins': Server.Middleware.Available['proxy']['options']['ejectPlugins']
  'middleware.proxy.options.followRedirects': Server.Middleware.Available['proxy']['options']['followRedirects']
  'middleware.proxy.options.forward': Server.Middleware.Available['proxy']['options']['forward']
  'middleware.proxy.options.headers': Record<string, string>
  'middleware.proxy.options.hostRewrite': Server.Middleware.Available['proxy']['options']['hostRewrite']
  'middleware.proxy.options.ignorePath': Server.Middleware.Available['proxy']['options']['ignorePath']
  'middleware.proxy.options.localAddress': Server.Middleware.Available['proxy']['options']['localAddress']
  'middleware.proxy.options.logger': Server.Middleware.Available['proxy']['options']['logger']
  'middleware.proxy.options.on': Server.Middleware.Available['proxy']['options']['on']
  'middleware.proxy.options.onProxyReq': Server.Middleware.Available['proxy']['options']['on']['proxyReq']
  'middleware.proxy.options.onProxyRes': Server.Middleware.Available['proxy']['options']['on']['proxyRes']
  'middleware.proxy.options.pathFilter': Server.Middleware.Available['proxy']['options']['pathFilter']
  'middleware.proxy.options.pathRewrite': Server.Middleware.Available['proxy']['options']['pathRewrite']
  'middleware.proxy.options.plugins': Server.Middleware.Available['proxy']['options']['plugins']
  'middleware.proxy.options.prependPath': Server.Middleware.Available['proxy']['options']['prependPath']
  'middleware.proxy.options.preserveHeaderKeyCase': Server.Middleware.Available['proxy']['options']['preserveHeaderKeyCase']
  'middleware.proxy.options.protocolRewrite': Server.Middleware.Available['proxy']['options']['protocolRewrite']
  'middleware.proxy.options.proxyTimeout': Server.Middleware.Available['proxy']['options']['proxyTimeout']
  'middleware.proxy.options.router': Server.Middleware.Available['proxy']['options']['router']
  'middleware.proxy.options.secure': Server.Middleware.Available['proxy']['options']['secure']
  'middleware.proxy.options.selfHandleResponse': Server.Middleware.Available['proxy']['options']['selfHandleResponse']
  'middleware.proxy.options.ssl': Server.Middleware.Available['proxy']['options']['ssl']
  'middleware.proxy.options.target': Server.Middleware.Available['proxy']['options']['target'] &
    URL
  'middleware.proxy.options.timeout': Server.Middleware.Available['proxy']['options']['timeout']
  'middleware.proxy.options.toProxy': Server.Middleware.Available['proxy']['options']['toProxy']
  'middleware.proxy.options.ws': Server.Middleware.Available['proxy']['options']['ws']
  'middleware.proxy.options.xfwd': Server.Middleware.Available['proxy']['options']['xfwd']

  /**
   * Proxy middleware replacements
   */
  'middleware.proxy.replacements': Array<[string, string]>
}

export type SyncRegistry = {
  [P in keyof Sync as `dev.${P & string}`]: Sync[P]
}

export interface Async {}

export type AsyncRegistry = {
  [P in keyof Async as `dev.${P & string}`]: Async[P]
}

export type Registry = SyncRegistry & AsyncRegistry
