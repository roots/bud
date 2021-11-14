import {lodash} from '@roots/bud-support'
export const {isNull, isUndefined} = lodash

export {
  createProxyMiddleware,
  responseInterceptor,
} from 'http-proxy-middleware'
