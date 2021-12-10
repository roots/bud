import type {Framework} from '@roots/bud-framework'
import {createProxyMiddleware} from 'http-proxy-middleware'

import {InterceptorFactory} from './interceptor.factory'
import {URL} from './url'
import {OptionsFactory} from './proxy.options'

/**
 * Proxy middleware factory
 *
 * @public
 */
export const middleware = (app: Framework) => {
  const url = new URL(() => app)
  const interceptor = new InterceptorFactory(() => app, url)
  const options = new OptionsFactory(url, interceptor.make)

  return createProxyMiddleware(
    app.hooks.filter('proxy.options', options.make),
  )
}
