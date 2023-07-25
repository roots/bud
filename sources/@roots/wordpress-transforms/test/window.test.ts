import * as window from '@roots/wordpress-transforms/window'
import {describe, expect, it} from 'vitest'

describe(`wordpress-transforms`, () => {
  it(`should transform request for provided library`, () => {
    expect(window.transform(`lodash`)).toEqual(`lodash`)
    expect(window.transform(`react-dom`)).toEqual(`ReactDOM`)
  })

  it(`should transform request for @wordpress namespace`, () => {
    expect(window.transform(`@wordpress/dom-ready`)).toEqual(
      expect.arrayContaining([`wp`, `domReady`]),
    )
  })

  it(`should return undefined for non-provided signifier`, () => {
    expect(window.transform(`canvas-confetti`)).not.toBeDefined()
  })
})
