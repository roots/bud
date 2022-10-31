import {describe, expect, it} from 'vitest'

import Extension from './index'

describe(`@roots/bud-imagemin`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
