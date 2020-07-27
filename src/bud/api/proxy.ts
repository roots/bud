import type { Bud } from "./types";

const proxy = function (this: Bud, {host, ssl = false}): Bud {
  const qualified = ssl ? `https://${host}` : `http://${host}`

  this.state.options.dev = {
    ...this.state.options.dev,
    host: host,
    proxy: {
      ...this.state.options.dev.proxy,
      target: qualified,
      headers: {
        ...this.state.options.dev.proxy.headers,
        'X-Bud-Proxy': qualified,
      },
    },
  }

  this.state.options.browserSync = {
    ...this.state.options.browserSync,
    proxy: {
      ...this.state.options.browserSync.proxy,
      target: qualified,
      ws: true,
      proxyReq: [
        function(proxyReq) {
          proxyReq.setHeader('X-Bud-Proxy', host)
        }
      ],
    },
  }

  return this
}

export {proxy}
