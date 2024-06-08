import {beforeEach, describe, expect, it, vi} from 'vitest'

import {setPublicProxyUrl as setPublicProxyUrlFn} from '../src/methods/setPublicProxyUrl'

describe(`@roots/bud-api/methods/setPublicProxyUrl`, () => {
  let bud: any
  let setPublicProxyUrl: setPublicProxyUrlFn

  beforeEach(async () => {
    bud = {
      hooks: {
        on: vi.fn(() => null),
      },
    }
    setPublicProxyUrl = setPublicProxyUrlFn.bind(bud)
  })

  it(`should call bud.hooks.on when provided a string`, () => {
    setPublicProxyUrl(`https://example.com`)
    expect(bud.hooks.on).toHaveBeenCalledWith(
      `dev.publicProxyUrl`,
      new URL(`https://example.com`),
    )
  })

  it(`should call bud.hooks.on when provided a URL`, () => {
    setPublicProxyUrl(new URL(`https://example.com`))
    expect(bud.hooks.on).toHaveBeenCalledWith(
      `dev.publicProxyUrl`,
      new URL(`https://example.com`),
    )
  })
})
