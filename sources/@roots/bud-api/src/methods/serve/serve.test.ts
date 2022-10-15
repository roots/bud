import {describe, expect, it, jest} from '@jest/globals'
import {Bud, factory} from '@repo/test-kit/bud'

import {method, Serve} from './index'

describe(`bud.serve`, () => {
  let bud: Bud
  let serve: Serve

  beforeEach(async () => {
    bud = await factory({mode: `development`})
    serve = method.bind(bud)
  })

  it(`should not call anything in prod`, async () => {
    bud.context.mode = `production`
    const spy = jest.spyOn(bud.hooks, `filter`)
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
    bud.fs.read = jest.fn(() => `test`)
    await serve({cert: `foo`})
    expect(bud.hooks.filter(`dev.options`).cert).toBe(`test`)
  })

  it(`should set from options (non ssl)`, async () => {
    const options = {host: `example.com`}
    await serve(options)

    expect(bud.hooks.filter(`dev.url`).hostname).toStrictEqual(
      options.host,
    )
  })

  it(`should set from options.port`, async () => {
    await serve({port: 1234})

    expect(bud.hooks.filter(`dev.url`).port).toBe(`1234`)
  })
})
