import {factory} from '@repo/test-kit/bud'
import {ServiceContainer} from '@roots/bud-framework/service'
import {beforeEach, describe, expect, it} from 'vitest'

import Env from './index.js'

describe(`@roots/bud/services/env`, () => {
  it(`is a container service`, async () => {
    const bud = await factory()
    const instance = new Env(() => bud)
    expect(instance).toBeInstanceOf(ServiceContainer)
  })
})
