import {Bud, factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {serve as serveFn} from './index.js'

describe(`bud.serve`, () => {
  let bud: Bud
  let serve: serveFn

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory({mode: `development`})
    serve = serveFn.bind(bud)
  })

  it(`should not call anything in prod`, async () => {
    const bud = await factory({mode: `production`})
    const spy = vi.spyOn(bud.hooks, `filter`)
    await serve(`http://example.com`)

    expect(spy).not.toHaveBeenCalled()
  })

  it(`should set from from string`, async () => {
    await serve(`http://example.com`)

    expect((bud.hooks.filter(`dev.url`) as URL).hostname).toBe(
      `example.com`,
    )
  })

  it(`should set from from number`, async () => {
    const port = 6969
    await serve(port)
    expect((bud.hooks.filter(`dev.url`) as URL).port).toBe(port.toString())
  })

  it(`should set from from URL`, async () => {
    await serve(new URL(`http://example.org:9696`))

    expect((bud.hooks.filter(`dev.url`) as URL).origin).toBe(
      `http://example.org:9696`,
    )
  })

  it(`should set from options`, async () => {
    // @ts-ignore
    bud.fs.read = vi.fn(() => `test`)
    await serve({cert: `foo`})

    expect(bud.hooks.filter(`dev.options`).cert).toBe(`test`)
  })

  it(`should set from options (non ssl)`, async () => {
    const options = {host: `example.com`}
    await serve(options)

    const value = bud.hooks.filter(`dev.url`)

    expect(value.hostname).toStrictEqual(options.host)
    expect(value.protocol).toStrictEqual(`http:`)
  })

  it(`should set from input.options.url (string)`, async () => {
    const options = {url: `http://example.com:3124`}
    await serve(options)

    const value = bud.hooks.filter(`dev.url`)

    expect(value.hostname).toStrictEqual(`example.com`)
    expect(value.port).toStrictEqual(`3124`)
    expect(value.protocol).toStrictEqual(`http:`)
  })

  it(`should set from input.options.url (url)`, async () => {
    const options = {url: new URL(`http://example.com:3124`)}
    await serve(options)

    const value = bud.hooks.filter(`dev.url`)

    expect(value.hostname).toStrictEqual(`example.com`)
    expect(value.port).toStrictEqual(`3124`)
    expect(value.protocol).toStrictEqual(`http:`)
  })

  it(`should set from options.port`, async () => {
    await serve({port: 1234})
    expect(bud.hooks.filter(`dev.url`).port).toBe(`1234`)
  })

  it(`should set from object input and object options`, async () => {
    await serve({port: 2345}, {cert: `foo`, key: `bar`})
    expect(bud.hooks.filter(`dev.url`).port).toBe(`2345`)
    expect(bud.hooks.filter(`dev.options`)).toEqual(
      expect.objectContaining({
        cert: `foo`,
        key: `bar`,
      }),
    )
  })

  it(`should assign options passed as second parameter`, async () => {
    // @ts-ignore
    bud.fs.read = vi.fn(param => param)
    await serve(`https://example.test:3000`, {cert: `foo`, key: `bar`})

    expect(bud.hooks.filter(`dev.options`)).toEqual(
      expect.objectContaining({
        cert: `foo`,
        key: `bar`,
      }),
    )
    expect(bud.hooks.filter(`dev.url`).origin).toBe(
      `https://example.test:3000`,
    )
  })
})
