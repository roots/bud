import {Bud, factory} from '@repo/test-kit/bud'
import logger from '@roots/bud-support/utilities/logger'
import {beforeEach, describe, expect, it} from 'vitest'

import * as middleware from './factory.js'

describe(`proxy middleware`, () => {
  let bud: Bud

  beforeEach(async () => {
    bud = await factory({mode: `development`})
  })

  it(`should have expected default options`, async () => {
    expect(middleware.makeOptions(bud)).toMatchInlineSnapshot(`
      {
        "autoRewrite": true,
        "changeOrigin": true,
        "cookieDomainRewrite": "0.0.0.0:3000",
        "followRedirects": false,
        "hostRewrite": "0.0.0.0:3000",
        "on": {
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
    if (bud.isCLI()) {
      bud.context.args.log = true
    }

    // @ts-ignore
    expect(middleware.makeOptions(bud).logger).toBe(logger)
  })

  it(`should reflect changes made in bud.proxy`, async () => {
    bud.proxy({changeOrigin: false})
    await bud.api.processQueue()

    expect(middleware.makeOptions(bud).changeOrigin).toBe(false)
  })

  it(`should reflect changes to URL made in bud.proxy`, async () => {
    bud.proxy(`http://example.com`)
    await bud.api.processQueue()
    // @ts-ignore
    expect(middleware.makeOptions(bud).target.href).toBe(
      new URL(`http://example.com`).href,
    )
  })

  it(`should reflect changes to URL made in bud.proxy`, async () => {
    bud.proxy(`https://example.com`)
    await bud.api.processQueue()
    expect(middleware.makeOptions(bud).protocolRewrite).toBe(`https`)

    bud.proxy(`http://example.com`)
    await bud.api.processQueue()
    expect(middleware.makeOptions(bud).protocolRewrite).toBe(undefined)
  })
})
