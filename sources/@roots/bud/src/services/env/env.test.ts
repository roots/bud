import {factory} from '@repo/test-kit/bud'
import {describe, expect, it} from 'vitest'

import Env from './env.js'

describe(`@roots/bud/services/env`, () => {
  it(`is a container service`, async () => {
    const bud = await factory()
    const instance = new Env(() => bud)
    expect(instance.constructor.name).toBe(`Env`)
  })
})
