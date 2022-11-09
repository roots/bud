import {describe, expect, it} from 'vitest'

import Service from './index.js'

describe(`@roots/bud-cache`, () => {
  it(`should be constructable`, () => {
    expect(Service).toBeInstanceOf(Function)
  })
})
