import type {IncomingMessage, ServerResponse} from 'node:http'

import type {Payload} from '@roots/bud-server/middleware/hot'
import type {
  NextFunction,
  NextHandleFunction,
} from '@roots/bud-support/express'

export interface HotEventStream {
  handler: NextHandleFunction
  publish(payload: Payload): void
  close(): void
}

/**
 * Response headers
 */
const headers = {
  'Access-Control-Allow-Origin': `*`,
  'Content-Type': `text/event-stream;charset=utf-8`,
  'Cache-Control': `no-cache, no-transform`,
  // While behind nginx, event stream should not be buffered:
  // http://nginx.org/docs/http/ngx_http_proxy_module.html#proxy_buffering
  'X-Accel-Buffering': `no`,
}

/**
 * Update interval
 */
const updateInterval = 1000

/**
 * Registered clients
 */
let clients = {}

/**
 * Current client identifier
 */
let currentClientId = 0

/**
 * Static fn to execute a callback on every registered client
 */
const tapClients = (fn: CallableFunction) =>
  Object.values(clients)
    .filter(Boolean)
    .forEach(client => fn(client))

const pingClient = client => {
  client.write(`{data: {"action": "ping"}\n\n`)
}

const closeClient = client => {
  if (client.finished) return
  client.end()
}

/**
 * Hot Module Replacement event stream
 */
export class HotEventStream {
  /**
   * hmr interval Timer
   */
  public interval: NodeJS.Timer

  /**
   * Class constructor
   */
  public constructor() {
    this.interval = setInterval(
      () => tapClients(pingClient),
      updateInterval,
    ).unref()
  }

  /**
   * Handle update message
   */
  public handle(
    req: IncomingMessage,
    res: ServerResponse,
    _next?: NextFunction,
  ) {
    const id = currentClientId++

    clients[id] = res

    const isHttp1 = parseInt(req.httpVersion) === 1

    if (isHttp1) {
      req.socket.setKeepAlive(true)
      Object.assign(headers, {Connection: `keep-alive`})
    }

    res.writeHead(200, headers)
    res.write(`\n`)

    req.on(`close`, () => {
      if (!res.writableEnded) res.end()
      delete clients[id]
    })
  }

  /**
   * Broadcast to clients
   */
  public publish(payload: Partial<Payload>) {
    if (!payload) return

    tapClients(client => {
      client.write(`data: ${JSON.stringify(payload)} \n\n`)
    })
  }

  /**
   * Close stream
   */
  public close() {
    clearInterval(this.interval)
    tapClients(closeClient)
    clients = {}
  }
}
