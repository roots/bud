import {describe, expect, it} from '@jest/globals'
import {factory} from '@repo/test-kit/bud'
import {ServiceContainer} from '@roots/bud-framework/service'

import Bud from '../../bud'
import Env from './index'

describe(`@roots/bud/services/env`, () => {
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
  })

  it(`is constructable`, () => {
    expect(Env).toBeInstanceOf(Function)
  })

  it(`is a container service`, () => {
    const instance = new Env(() => bud)
    expect(instance).toBeInstanceOf(ServiceContainer)
  })
})
