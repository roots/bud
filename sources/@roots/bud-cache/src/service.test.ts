import {describe, expect, it} from '@jest/globals'

import Service from './index'

describe(`@roots/bud-cache`, () => {
  it(`should be constructable`, () => {
    expect(Service).toBeInstanceOf(Function)
  })
})
