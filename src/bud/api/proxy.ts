import type {Bud} from './types'

/**
 * @todo WDS
 */
const proxy = function (this: Bud, {host, ssl = false}): Bud {
  const qualified = ssl ? `https://${host}` : `http://${host}`

  this.options.merge('dev', {
    host: host,
    proxy: {
      ...this.options.get('dev').proxy,
      target: qualified,
      headers: {
        ...this.options.get('dev').proxy.headers,
        'X-Bud-Proxy': qualified,
      },
    },
  })

  this.options.merge('browserSync', {
    ...this.options.get('browserSync'),
    proxy: {
      ...this.options.get('browserSync').proxy,
      target: qualified,
      ws: true,
      proxyReq: [
        function (proxyReq) {
          proxyReq.setHeader('X-Bud-Proxy', host)
        },
      ],
    },
  })

  return this
}

export {proxy}
