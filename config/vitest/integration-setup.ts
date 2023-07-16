import {beforeAll} from 'vitest'

beforeAll(() => {
  globalThis.__INTEGRATION__ = true
})
