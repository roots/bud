import * as transforms from '@roots/wordpress-transforms'
import {describe, expect, it} from 'vitest'

describe(`wordpress-transforms`, () => {
  it(`should export functions`, async () => {
    expect(transforms.handle).toEqual(
      await import(`@roots/wordpress-transforms/handle`),
    )
    expect(transforms.window).toEqual(
      await import(`@roots/wordpress-transforms/window`),
    )
    expect(transforms.wordpress).toEqual(
      await import(`@roots/wordpress-transforms/wordpress`),
    )
  })
})
