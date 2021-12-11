import type {Framework} from '@roots/bud-framework'
import {createProxyMiddleware} from 'http-proxy-middleware'

import {OptionsFactory} from './proxy.options'
import {RequestInterceptorFactory} from './req.interceptor'
import {ResponseInterceptorFactory} from './res.interceptor'
import {URL} from './url'

/**
 * Proxy middleware factory
 *
 * @public
 */
export const middleware = (app: Framework) => {
  const url = new URL(() => app)
  const interceptor = new ResponseInterceptorFactory(
    () => app,
    url,
  )
  const request = new RequestInterceptorFactory(() => app, url)

  const options = new OptionsFactory(
    url,
    interceptor.make(),
    request.make(),
  )

  return createProxyMiddleware(
    ['*', '/**/*', '!/__bud/**/*', '!/**/*.hot-update.*'],
    app.hooks.filter('proxy.options', options.make),
  )
}
