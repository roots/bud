import {describe, expect, it} from 'vitest'

import domReady from './dom-ready'
import * as client from './index'
import lazy from './lazy'

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
