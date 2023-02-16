import {describe, expect, it} from 'vitest'

import domReady from '../../src/client/dom-ready.js'
import * as client from '../../src/client/index.js'
import lazy from '../../src/client/lazy.js'

describe(`@roots/sage`, () => {
  it(`@roots/sage/client`, () => {
    expect(client).toMatchSnapshot()
  })

  it(`@roots/sage/client/dom-ready`, () => {
    expect(client.domReady).toBe(domReady)
  })

  it(`@roots/sage/client/lazy`, () => {
    expect(client.lazy).toBe(lazy)
  })
})
