import {describe, expect, it} from 'vitest'

import Service from './index'

describe(`@roots/bud-cache`, () => {
  it(`should be constructable`, () => {
    expect(Service).toBeInstanceOf(Function)
  })
})
