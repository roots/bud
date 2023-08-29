import {type Bud, factory} from '@repo/test-kit'
import {
  ApplicationURL,
  makeOptions,
} from '@roots/bud-server/middleware/proxy'
import logger from '@roots/bud-support/logger'
import {beforeEach, describe, expect, it} from 'vitest'

describe(`proxy middleware`, () => {
  let bud: Bud
  let url: ApplicationURL

  beforeEach(async () => {
    bud = await factory({mode: `development`})
    url = new ApplicationURL(() => bud)
  })

  it(`should have expected default options`, async () => {
    expect(url.dev?.href).toBe(`http://0.0.0.0:3000/`)
    expect(url.proxy.href).toBe(`http://0.0.0.0/`)
  })

  it(`should have expected default options`, async () => {
    bud = await factory({mode: `development`})
    expect(makeOptions(bud)).toMatchInlineSnapshot(`
      {
        "autoRewrite": true,
        "changeOrigin": true,
        "cookieDomainRewrite": "0.0.0.0:3000",
        "followRedirects": false,
        "hostRewrite": "0.0.0.0:3000",
        "logger": [Function],
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
    bud = await factory({mode: `development`})
    bud.context.log = true

    // @ts-ignore
    expect(makeOptions(bud).logger).toBeTypeOf(`function`)
  })

  it(`should reflect changes made in bud.proxy`, async () => {
    bud.proxy({changeOrigin: false})
    await bud.promise()

    expect(makeOptions(bud).changeOrigin).toBe(false)
  })

  it(`should reflect changes to URL made in bud.proxy`, async () => {
    bud.proxy(`http://example.com`)
    await bud.promise()
    // @ts-ignore
    expect(makeOptions(bud).target.href).toBe(
      new URL(`http://example.com`).href,
    )
  })

  it(`should reflect changes to URL made in bud.proxy`, async () => {
    bud.proxy(`https://example.com`)
    await bud.promise()
    expect(makeOptions(bud).protocolRewrite).toBe(`https`)

    bud.proxy(`http://example.com`)
    await bud.promise()
    expect(makeOptions(bud).protocolRewrite).toBe(undefined)
  })
})
