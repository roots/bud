import {describe, expect, it} from 'vitest'

import domReady from './dom-ready.js'
import * as client from './index.js'
import lazy from './lazy.js'

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
