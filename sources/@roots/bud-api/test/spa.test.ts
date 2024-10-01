import {beforeEach, describe, expect, it, vi} from 'vitest'

import {spa as spaFn} from '../src/methods/spa'

describe(`@roots/bud-api/methods/spa`, () => {
  let bud: any
  let spa: spaFn

  beforeEach(async () => {
    bud = {
      api: {
        logger: {
          log: vi.fn(() => null),
        },
      },
      hooks: {
        on: vi.fn(() => null),
      },
      isDevelopment: true,
      server: {
        url: `http://0.0.0.0:3000`,
      },
      setProxyUrl: vi.fn(() => null),
      setUrl: vi.fn(() => null),
    }

    spa = spaFn.bind(bud)
  })

  it(`should call bud.setUrl`, () => {
    spa(`https://example.com:3030`)
    expect(bud.setUrl).toHaveBeenCalledWith(`https://example.com:3030`)

    spa(3030)
    expect(bud.setUrl).toHaveBeenCalledWith(3030)

    const url = new URL(`https://example.com`)
    spa(url)
    expect(bud.setUrl).toHaveBeenCalledWith(url)

    spa()
    expect(bud.setUrl).toHaveBeenCalledWith(bud.server.url)
  })

  it(`should call bud.setProxyUrl`, () => {
    spa(`https://example.com:3030`)
    expect(bud.setProxyUrl).toHaveBeenCalledWith(
      `https://example.com:3030`,
    )

    spa(3030)
    expect(bud.setProxyUrl).toHaveBeenCalledWith(3030)

    const url = new URL(`https://example.com:3030`)
    spa(url)
    expect(bud.setProxyUrl).toHaveBeenCalledWith(url)
  })

  it(`should call bud.hooks.on`, () => {
    spa()

    expect(bud.hooks.on).toHaveBeenCalledWith(
      `dev.middleware.proxy.options.ignorePath`,
      true,
    )
  })

  it(`should bail when bud.isDevelopment is false`, () => {
    bud.isDevelopment = false
    spa()

    expect(bud.setUrl).not.toHaveBeenCalled()
    expect(bud.setProxyUrl).not.toHaveBeenCalled()
    expect(bud.hooks.on).not.toHaveBeenCalled()
  })
})
