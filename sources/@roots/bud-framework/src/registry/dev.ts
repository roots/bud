import type {Bud} from '@roots/bud-framework'
import type {
  Connection,
  Middleware,
  Options,
} from '@roots/bud-framework/services/server'
import type {WatchOptions} from '@roots/bud-support/chokidar'

import type {ListenOptions} from 'node:net'

export interface Sync {
  'client.dist': string

  'client.path': string

  /**
   * Scripts included in dev builds
   */
  'client.scripts': Set<(app: Bud) => string>

  'client.standalone': boolean

  listenOptions: ListenOptions

  'middleware.dev.options': Middleware.Available['dev']['options']

  'middleware.dev.options.headers': Middleware.Available['dev']['options']['headers']

  'middleware.dev.options.index': Middleware.Available['dev']['options']['index']

  'middleware.dev.options.methods': Middleware.Available['dev']['options']['methods']

  'middleware.dev.options.publicPath': Middleware.Available['dev']['options']['publicPath']

  'middleware.dev.options.writeToDisk': Middleware.Available['dev']['options']['writeToDisk']

  /**
   * Enabled middleware
   */
  'middleware.enabled': Array<keyof Middleware.Available>
  'middleware.proxy.options': Middleware.Available['proxy']['options']
  'middleware.proxy.options.agent': Middleware.Available['proxy']['options']['agent']
  'middleware.proxy.options.auth': Middleware.Available['proxy']['options']['auth']

  'middleware.proxy.options.autoRewrite': Middleware.Available['proxy']['options']['autoRewrite']

  'middleware.proxy.options.buffer': Middleware.Available['proxy']['options']['buffer']
  'middleware.proxy.options.changeOrigin': Middleware.Available['proxy']['options']['changeOrigin']
  'middleware.proxy.options.cookieDomainRewrite': Middleware.Available['proxy']['options']['cookieDomainRewrite']
  'middleware.proxy.options.cookiePathRewrite': Middleware.Available['proxy']['options']['cookiePathRewrite']
  'middleware.proxy.options.ejectPlugins': Middleware.Available['proxy']['options']['ejectPlugins']
  'middleware.proxy.options.followRedirects': Middleware.Available['proxy']['options']['followRedirects']

  'middleware.proxy.options.forward': Middleware.Available['proxy']['options']['forward']
  'middleware.proxy.options.headers': Record<string, string>
  'middleware.proxy.options.hostRewrite': Middleware.Available['proxy']['options']['hostRewrite']
  'middleware.proxy.options.ignorePath': Middleware.Available['proxy']['options']['ignorePath']
  'middleware.proxy.options.localAddress': Middleware.Available['proxy']['options']['localAddress']
  'middleware.proxy.options.logger': Middleware.Available['proxy']['options']['logger']
  'middleware.proxy.options.on': Middleware.Available['proxy']['options']['on']
  'middleware.proxy.options.onProxyReq': Middleware.Available['proxy']['options']['on']['proxyReq']
  'middleware.proxy.options.onProxyRes': Middleware.Available['proxy']['options']['on']['proxyRes']
  'middleware.proxy.options.pathFilter': Middleware.Available['proxy']['options']['pathFilter']
  'middleware.proxy.options.pathRewrite': Middleware.Available['proxy']['options']['pathRewrite']
  'middleware.proxy.options.plugins': Middleware.Available['proxy']['options']['plugins']
  'middleware.proxy.options.prependPath': Middleware.Available['proxy']['options']['prependPath']
  'middleware.proxy.options.preserveHeaderKeyCase': Middleware.Available['proxy']['options']['preserveHeaderKeyCase']
  'middleware.proxy.options.protocolRewrite': Middleware.Available['proxy']['options']['protocolRewrite']
  'middleware.proxy.options.proxyTimeout': Middleware.Available['proxy']['options']['proxyTimeout']
  'middleware.proxy.options.router': Middleware.Available['proxy']['options']['router']
  'middleware.proxy.options.secure': Middleware.Available['proxy']['options']['secure']
  'middleware.proxy.options.selfHandleResponse': Middleware.Available['proxy']['options']['selfHandleResponse']
  'middleware.proxy.options.ssl': Middleware.Available['proxy']['options']['ssl']
  'middleware.proxy.options.target': Middleware.Available['proxy']['options']['target'] &
    URL
  'middleware.proxy.options.timeout': Middleware.Available['proxy']['options']['timeout']
  'middleware.proxy.options.toProxy': Middleware.Available['proxy']['options']['toProxy']
  'middleware.proxy.options.ws': Middleware.Available['proxy']['options']['ws']
  'middleware.proxy.options.xfwd': Middleware.Available['proxy']['options']['xfwd']
  /**
   * Proxy middleware replacements
   */
  'middleware.proxy.replacements': Array<[string, string]>
  /**
   * Error callback
   */
  onError: Connection['onError']
  /**
   * On listening callback
   */
  onListening: Connection['onListening']
  /**
   * Request callback
   */
  onRequest: Connection['onRequest']
  /**
   * Dev server connection options
   */
  options: Options
  /**
   * Proxy URL
   */
  proxyUrl: URL
  /**
   * Public proxy URL
   */
  publicProxyUrl: URL
  /**
   * External URL
   */
  publicUrl: URL
  /**
   * Server URL
   */
  url: URL
  /**
   * Files which trigger a full browser reload
   */
  'watch.files': Set<string>

  /**
   * FS.Watcher options
   */
  'watch.options': WatchOptions
}

export type SyncRegistry = {
  [P in keyof Sync as `dev.${P & string}`]: Sync[P]
}

export interface Async {}

export type AsyncRegistry = {
  [P in keyof Async as `dev.${P & string}`]: Async[P]
}

export type Registry = SyncRegistry & AsyncRegistry
