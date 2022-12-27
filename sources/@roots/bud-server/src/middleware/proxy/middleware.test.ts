import {Bud, factory} from '@repo/test-kit/bud'
import signale from '@roots/bud-support/signale'
import {beforeEach, describe, expect, it} from 'vitest'

import {makeOptions, middleware} from './middleware.js'

describe(`proxy middleware`, () => {
  let bud: Bud

  beforeEach(async () => {
    bud = await factory({mode: `development`})
  })
  it(`should have expected default options`, async () => {
    expect(makeOptions(bud)).toMatchInlineSnapshot(`
      {
        "autoRewrite": true,
        "changeOrigin": true,
        "cookieDomainRewrite": "0.0.0.0:3000",
        "followRedirects": false,
        "hostRewrite": "0.0.0.0:3000",
        "on": {
          "proxyReq": [Function],
          "proxyRes": [Function],
        },
        "pathFilter": [
          "!/bud/hot/**",
        ],
        "secure": false,
        "selfHandleResponse": true,
        "target": "http://0.0.0.0/",
      }
    `)
  })

  it(`should have logger when --log flag is used`, async () => {
    bud.context.args.log = true
    // @ts-ignore
    expect(makeOptions(bud).logger).toBeInstanceOf(signale)
  })

  it(`should reflect changes made in bud.proxy`, async () => {
    bud.proxy({changeOrigin: false})
    await bud.api.processQueue()

    expect(makeOptions(bud).changeOrigin).toBe(false)
  })

  it(`should reflect changes to URL made in bud.proxy`, async () => {
    bud.proxy(`http://example.com`)
    await bud.api.processQueue()
    // @ts-ignore
    expect(makeOptions(bud).target.href).toBe(
      new URL(`http://example.com`).href,
    )
  })

  it(`should reflect changes to URL made in bud.proxy`, async () => {
    bud.proxy(`https://example.com`)
    await bud.api.processQueue()
    expect(makeOptions(bud).protocolRewrite).toBe(`https`)

    bud.proxy(`http://example.com`)
    await bud.api.processQueue()
    expect(makeOptions(bud).protocolRewrite).toBe(undefined)
  })
})
