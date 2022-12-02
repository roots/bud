import type {IncomingMessage, ServerResponse} from 'node:http'

import type {Bud} from '@roots/bud-framework'
import {responseInterceptor} from 'http-proxy-middleware'

import type {ApplicationURL} from '../url.js'

declare module 'node:http' {
  interface IncomingMessage {
    cookies?: Record<string, any>
  }
  interface ServerResponse {
    cookie: CallableFunction
  }
}

const factory = (bud: Bud, url: ApplicationURL) =>
  responseInterceptor(async (buffer, proxy, request, response) => {
    response
      .setHeader(`x-proxy-by`, `@roots/bud`)
      .setHeader(`x-bud-origin`, url.dev.origin)
      .setHeader(`x-bud-dev-origin`, url.dev.origin)
      .setHeader(`x-bud-dev-protocol`, url.dev.protocol)
      .setHeader(`x-bud-dev-hostname`, url.dev.hostname)
      .setHeader(`x-bud-proxy-origin`, url.proxy.origin)

    response.removeHeader(`content-security-policy`)
    response.removeHeader(`x-http-method-override`)

    setResponseCookies(request, response)
    return transformResponseBuffer(bud, url, proxy, buffer)
  })

const setResponseCookies = (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  if (request.cookies) {
    Object.entries(request.cookies).map(([k, v]) => {
      response.cookie(k, v, {domain: undefined})
    })
  }

  const headers = response.getHeaders()
  if (!headers[`set-cookie`]) return

  const cookies = Array.isArray(headers[`set-cookie`])
    ? headers[`set-cookie`]
    : [headers[`set-cookie`]]

  response.setHeader(
    `set-cookie`,
    cookies.map(String).map(value => value.replace(`; secure`, ``).trim()),
  )
}

const transformResponseBuffer = (
  bud: Bud,
  url: ApplicationURL,
  proxy: IncomingMessage,
  buffer: Buffer,
) => {
  if (!isTransformable(proxy)) return buffer

  return bud.hooks
    .filter(`dev.middleware.proxy.replacements`, [
      [url.proxy.origin, url.dev.origin],
      [url.proxy.host, url.dev.host],
    ])
    .reduce(transformBody, buffer.toString(`utf8`))
}

const isTransformable = (message?: IncomingMessage) => {
  if (typeof message?.headers?.[`content-type`] !== `string`) return false
  const type = message.headers[`content-type`]
  return (
    type.startsWith(`text/css`) ||
    type.startsWith(`text/html`) ||
    type.startsWith(`application/javascript`) ||
    type.startsWith(`application/json`)
  )
}

const transformBody = (value: string, [search, replace]) =>
  value.replaceAll(new RegExp(search, `g`), replace)

export {factory}
