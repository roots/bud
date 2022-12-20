import {factory} from '@repo/test-kit/bud'
// @ts-ignore
import signale from '@roots/bud-support/signale'
import {beforeEach, describe, expect, it} from 'vitest'

import {makeOptions, proxy} from './index.js'

describe(`proxy middleware`, () => {
  let bud
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

  it(`proxy func should return RequestHandler`, async () => {
    expect(proxy(bud)).toEqual(
      expect.objectContaining({upgrade: expect.any(Function)}),
    )
  })
})
