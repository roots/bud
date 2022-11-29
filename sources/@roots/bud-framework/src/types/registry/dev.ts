import type {WatchOptions} from 'chokidar'

import type {Bud} from '../../bud.js'
import type * as Server from '../services/server/index.js'

export interface Sync {
  /**
   * Dev server connection options
   * @public
   */
  options: Server.Options

  /**
   * Server URL
   * @public
   */
  url: URL

  /**
   * Files which trigger a full browser reload
   * @public
   */
  'watch.files': Set<string>

  /**
   * FS.Watcher options
   * @public
   */
  'watch.options': WatchOptions

  /**
   * Scripts included in dev builds
   * @public
   */
  'client.scripts': Set<(app: Bud) => string>
  'client.standalone': boolean
  'client.path': string
  'client.dist': string

  /**
   * Enabled middleware
   * @public
   */
  'middleware.enabled': Array<keyof Server.Middleware.Available>

  'middleware.dev.options': Server.Middleware.Available['dev']['options']
  'middleware.dev.options.headers': Server.Middleware.Available['dev']['options']['headers']
  'middleware.dev.options.index': Server.Middleware.Available['dev']['options']['index']
  'middleware.dev.options.publicPath': Server.Middleware.Available['dev']['options']['publicPath']
  'middleware.dev.options.writeToDisk': Server.Middleware.Available['dev']['options']['writeToDisk']

  /**
   * Proxy URL paths
   * @public
   */
  'middleware.proxy.paths': Array<string>

  'middleware.proxy.options': Server.Middleware.Available['proxy']['options']
  'middleware.proxy.options.autoRewrite': Server.Middleware.Available['proxy']['options']['autoRewrite']
  'middleware.proxy.options.changeOrigin': Server.Middleware.Available['proxy']['options']['changeOrigin']
  'middleware.proxy.options.cookieDomainRewrite': Server.Middleware.Available['proxy']['options']['cookieDomainRewrite']
  'middleware.proxy.options.followRedirects': Server.Middleware.Available['proxy']['options']['followRedirects']
  'middleware.proxy.options.forward': Server.Middleware.Available['proxy']['options']['forward']
  'middleware.proxy.options.headers': Record<string, string>
  'middleware.proxy.options.hostRewrite': Server.Middleware.Available['proxy']['options']['hostRewrite']
  'middleware.proxy.options.onProxyReq': Server.Middleware.Available['proxy']['options']['on']['proxyReq']
  'middleware.proxy.options.onProxyRes': Server.Middleware.Available['proxy']['options']['on']['proxyRes']
  'middleware.proxy.options.protocolRewrite': Server.Middleware.Available['proxy']['options']['protocolRewrite']
  'middleware.proxy.options.secure': Server.Middleware.Available['proxy']['options']['secure']
  'middleware.proxy.options.selfHandleResponse': Server.Middleware.Available['proxy']['options']['selfHandleResponse']

  /**
   * Proxy target URL
   * @public
   */
  'middleware.proxy.target': URL

  /**
   * Proxy middleware replacements
   * @public
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
