import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it} from 'vitest'

import {ApplicationURL} from './url.js'

describe(`proxy middleware`, () => {
  let bud
  let url
  beforeEach(async () => {
    bud = await factory({mode: `development`})
    url = new ApplicationURL(() => bud)
  })

  it(`should have expected default options`, async () => {
    expect(url.dev.href).toBe(`http://0.0.0.0:3000/`)
    expect(url.proxy.href).toBe(`http://0.0.0.0/`)
  })
})
