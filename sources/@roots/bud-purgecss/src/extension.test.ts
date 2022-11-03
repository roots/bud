import {describe, expect, it} from 'vitest'

import Extension from './index'

describe(`@roots/bud-purgecss`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toEqual(
      expect.objectContaining({
        label: `@roots/bud-purgecss`,
        dependsOn: expect.any(Set),
        register: expect.any(Function),
      }),
    )
  })
})
