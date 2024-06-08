import {Bud, factory} from '@repo/test-kit'
import {beforeEach, describe, expect, it} from 'vitest'

import {development} from '../../../src/extension/decorators/development'

// @ts-ignore
@development
class TestClass {
  public app: Bud
  public constructor(bud: Bud) {
    this.app = bud
  }
}

describe(`@roots/bud-framework/extension/decorators/development`, () => {
  it(`should return a decorator`, () => {
    expect(development).toBeInstanceOf(Function)
  })

  it(`should add a when method to the class that returns truthy when isDevelopment is true`, async () => {
    const bud = await factory({mode: `development`})

    expect(
      // @ts-ignore
      await new TestClass(bud).enabled,
    ).toBeTruthy()
  })

  it(`should add a when method to the class that returns falsy when isDevelopment is false`, async () => {
    const bud = await factory({mode: `production`})

    expect(
      // @ts-ignore
      await new TestClass(bud).enabled,
    ).toBeFalsy()
  })
})
