import {describe, expect, it, vi} from 'vitest'

import {Api as Service} from './api/service.js'
import Api from './index.js'

describe(`@roots/bud-api`, () => {
  it(`should export the API service class`, () => {
    expect(Api).toBe(Service)
  })
})
