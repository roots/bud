import * as handle from '@roots/wordpress-transforms/handle'
import {describe, expect, it} from 'vitest'

describe(`wordpress-transforms`, () => {
  it(`should transform request for provided library`, () => {
    expect(handle.transform(`lodash`)).toEqual(`lodash`)
    expect(handle.transform(`react-dom`)).toEqual(`react-dom`)
  })

  it(`should transform request for @wordpress namespace`, () => {
    expect(handle.transform(`@wordpress/dom-ready`)).toEqual(
      `wp-dom-ready`,
    )
  })

  it(`should return undefined for non-provided signifier`, () => {
    expect(handle.transform(`canvas-confetti`)).not.toBeDefined()
  })
})
