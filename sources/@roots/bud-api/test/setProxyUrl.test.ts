import {beforeEach, describe, expect, it, vi} from 'vitest'

import {setProxyUrl as setProxyUrlFn} from '../src/methods/setProxyUrl'

describe(`@roots/bud-api/methods/setProxyUrl`, () => {
  let bud: any
  let setProxyUrl: setProxyUrlFn

  beforeEach(async () => {
    bud = {
      proxy: vi.fn(() => null),
    }
    setProxyUrl = setProxyUrlFn.bind(bud)
  })

  it(`should be a passthrough for bud.proxy`, () => {
    setProxyUrl(`https://example.com`)
    expect(bud.proxy).toHaveBeenCalledWith(`https://example.com`)
  })
})
