import type {Options} from 'http-proxy-middleware'
import type * as HttpProxy from 'http-proxy-middleware'
import {
  createProxyMiddleware,
  responseInterceptor,
} from 'http-proxy-middleware'

export {createProxyMiddleware, responseInterceptor}
export type {HttpProxy, Options}
