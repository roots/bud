import {WatchOptions} from 'chokidar'

import {Bud} from '../bud'
import * as Server from '../services/server'

export interface Dev {
  /**
   * Dev server connection options
   * @public
   */
  'dev.options': Server.Options

  /**
   * IPV4 or IPV6 binding
   * @public
   */
  'dev.interface': string

  /**
   * Server URL
   * @public
   */
  'dev.url': URL

  /**
   * Files which trigger a full browser reload
   */
  'dev.watch.files': Set<string>
  /**
   * FS.Watcher options
   * @public
   */
  'dev.watch.options': WatchOptions

  /**
   * Scripts included in dev builds
   * @public
   */
  'dev.client.scripts': Set<(app: Bud) => string>

  /**
   * Enabled middleware
   * @public
   */
  'dev.middleware.enabled': Array<keyof Server.Middleware.Available>

  'dev.middleware.dev.options': Server.Middleware.Available['dev']['options']
  'dev.middleware.dev.options.headers': Server.Middleware.Available['dev']['options']['headers']
  'dev.middleware.dev.options.publicPath': Server.Middleware.Available['dev']['options']['publicPath']
  'dev.middleware.dev.options.stats': Server.Middleware.Available['dev']['options']['stats']
  'dev.middleware.dev.options.writeToDisk': Server.Middleware.Available['dev']['options']['writeToDisk']

  'dev.middleware.hot.options': Server.Middleware.Available['hot']['options']
  'dev.middleware.hot.options.heartbeat': Server.Middleware.Available['hot']['options']['heartbeat']
  'dev.middleware.hot.options.log': Server.Middleware.Available['hot']['options']['log']
  'dev.middleware.hot.options.path': Server.Middleware.Available['hot']['options']['path']

  'dev.middleware.proxy.options': Server.Middleware.Available['proxy']['options']
  'dev.middleware.proxy.options.autoRewrite': Server.Middleware.Available['proxy']['options']['autoRewrite']
  'dev.middleware.proxy.options.changeOrigin': Server.Middleware.Available['proxy']['options']['changeOrigin']
  'dev.middleware.proxy.options.cookieDomainRewrite': Server.Middleware.Available['proxy']['options']['cookieDomainRewrite']
  'dev.middleware.proxy.options.followRedirects': Server.Middleware.Available['proxy']['options']['followRedirects']
  'dev.middleware.proxy.options.headers': Server.Middleware.Available['proxy']['options']['headers']
  'dev.middleware.proxy.options.hostRewrite': Server.Middleware.Available['proxy']['options']['hostRewrite']
  'dev.middleware.proxy.options.logLevel': Server.Middleware.Available['proxy']['options']['logLevel']
  'dev.middleware.proxy.options.onProxyReq': Server.Middleware.Available['proxy']['options']['onProxyReq']
  'dev.middleware.proxy.options.onProxyRes': Server.Middleware.Available['proxy']['options']['onProxyRes']
  'dev.middleware.proxy.options.protocolRewrite': Server.Middleware.Available['proxy']['options']['protocolRewrite']
  'dev.middleware.proxy.options.secure': Server.Middleware.Available['proxy']['options']['secure']
  'dev.middleware.proxy.options.selfHandleResponse': Server.Middleware.Available['proxy']['options']['selfHandleResponse']

  /**
   * Proxy target URL
   * @public
   */
  'dev.middleware.proxy.target': URL

  /**
   * Proxy middleware replacements
   * @public
   */
  'dev.middleware.proxy.replacements': Array<[RegExp | string, string]>
}
