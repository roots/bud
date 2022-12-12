import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it} from 'vitest'

import Env from './env.js'
import type {Bud} from '../../index.js'

describe(`@roots/bud/services/env`, () => {
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
  })

  it(`is a container service`, async () => {
    const bud = await factory()
    const instance = new Env(() => bud)
    expect(instance.constructor.name).toBe(`Env`)
  })
})
