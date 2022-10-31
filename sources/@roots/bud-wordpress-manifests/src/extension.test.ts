import {describe, expect, it} from 'vitest'

import Extension from './index'

describe(`@roots/bud-wordpress-manifests`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})
