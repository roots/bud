import {describe, expect, it} from '@jest/globals'

import Extension from './index'

describe(`@roots/bud-wordpress-manifests`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
