import {type Bud, factory} from '@repo/test-kit'
import {makeOptions, responseInterceptor} from '@roots/bud-server/middleware/proxy'
import {Logger} from '@roots/bud-support/logger'
import {describe, expect, it} from 'vitest'

describe(`proxy middleware`, () => {
  let bud: Bud

  it(`should have expected exports`, () => {
    expect(makeOptions).toBeInstanceOf(Function)
    expect(responseInterceptor.factory).toBeInstanceOf(Function)
  })

  it(`should have expected default options`, async () => {
    bud = await factory({mode: `development`})
    const options = makeOptions(bud)

    expect(options.autoRewrite).toBe(true)
    expect(options.changeOrigin).toBe(true)
    expect(options.cookieDomainRewrite).toBe(`0.0.0.0:3000`)
    expect(options.followRedirects).toBe(false)
    expect(options.hostRewrite).toBe(`0.0.0.0:3000`)
    expect(options.logger).toBeInstanceOf(Logger)
    expect(options.on).toEqual({
      proxyRes: expect.any(Function),
    })
    expect(options.pathFilter).toEqual([`!/bud/hot/**`])
    expect(options.secure).toBe(false)
    expect(options.selfHandleResponse).toBe(true)
    expect(options.target).toEqual(new URL(`http://0.0.0.0`))
  })

  it(`should have logger when --log flag is used`, async () => {
    bud = await factory({mode: `development`})
    bud.context.log = true

    // @ts-ignore
    expect(makeOptions(bud).logger).toBeInstanceOf(Logger)
  })

  it(`should reflect changes made in bud.proxy`, async () => {
    bud = await factory({mode: `development`})
    bud.proxy({changeOrigin: false})
    await bud.promise()

    expect(makeOptions(bud).changeOrigin).toBe(false)
  })

  it(`should reflect changes to URL made in bud.proxy`, async () => {
    bud = await factory({mode: `development`})
    bud.proxy(`http://example.com`)
    await bud.promise()

    const options = makeOptions(bud)
    const href = options.target && typeof options.target !== `string` && `href` in options.target ? options.target.href : undefined
    const matchHref = new URL(`http://example.com`).href

    expect(href).toBe(matchHref)
  })

  it(`should reflect changes to URL made in bud.proxy`, async () => {
    bud = await factory({mode: `development`})
    bud.proxy(`https://example.com`)
    await bud.promise()
    expect(makeOptions(bud).protocolRewrite).toBe(`https`)

    bud.proxy(`http://example.com`)
    await bud.promise()
    expect(makeOptions(bud).protocolRewrite).toBe(undefined)
  })
})
