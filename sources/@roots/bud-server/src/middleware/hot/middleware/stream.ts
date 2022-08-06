import type {NextHandleFunction} from 'connect'
import type {NextFunction} from 'express'
import type {IncomingMessage, ServerResponse} from 'http'

export interface HotEventStream {
  handler: NextHandleFunction
  publish(payload: any): void
  close(): void
}

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'text/event-stream;charset=utf-8',
  'Cache-Control': 'no-cache, no-transform',
  // While behind nginx, event stream should not be buffered:
  // http://nginx.org/docs/http/ngx_http_proxy_module.html#proxy_buffering
  'X-Accel-Buffering': 'no',
}

const updateInterval = 10 * 1000

let clients = {}
let currentClientId = 0

const tapClients = (fn: CallableFunction) =>
  Object.values(clients)
    .filter(Boolean)
    .forEach(client => fn(client))

export class HotEventStream {
  public interval: NodeJS.Timer

  public constructor() {
    this.interval = setInterval(
      () =>
        tapClients(client => {
          client.write('data: \uD83D\uDC93\n\n')
        }),
      updateInterval,
    ).unref()
  }

  public handle(
    req: IncomingMessage,
    res: ServerResponse,
    _next?: NextFunction,
  ) {
    const id = currentClientId++

    clients[id] = res

    const isHttp1 = !(parseInt(req.httpVersion) >= 2)

    if (isHttp1) {
      req.socket.setKeepAlive(true)
      Object.assign(headers, {
        Connection: 'keep-alive',
      })
    }

    res.writeHead(200, headers)
    res.write('\n')

    req.on('close', () => {
      if (!res.writableEnded) res.end()
      clients[id] = undefined
    })
  }

  public publish(payload) {
    tapClients(client => {
      client.write('data: ' + JSON.stringify(payload) + '\n\n')
    })
  }

  public close() {
    clearInterval(this.interval)
    tapClients(client => {
      if (!client.finished) client.end()
    })
    clients = {}
  }
}
