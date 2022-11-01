import {describe, expect, it} from 'vitest'

import {development} from './development'

@development
// @ts-ignore
class TestClass {}

describe(`development`, () => {
  it(`should return a decorator`, () => {
    expect(development).toBeInstanceOf(Function)
  })

  it(`should add a when method to the class that returns truthy when isDevelopment is true`, async () => {
    expect(
      // @ts-ignore
      await new TestClass().when({isDevelopment: true}),
    ).toBeTruthy()
  })

  it(`should add a when method to the class that returns falsy when isDevelopment is false`, async () => {
    expect(
      // @ts-ignore
      await new TestClass().when({isDevelopment: false}),
    ).toBeFalsy()
  })
})
