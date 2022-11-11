import {describe, expect, it} from 'vitest'

import * as Extension from './extension.js'

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
