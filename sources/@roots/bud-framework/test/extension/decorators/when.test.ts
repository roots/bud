import {describe, expect, it} from 'vitest'

import {when} from '../../../src/extension/decorators/when'

// @ts-ignore
@when(() => true)
class TestClass {}

describe(`when`, () => {
  it(`should return a decorator`, async () => {
    expect(when(() => true)).toBeInstanceOf(Function)
  })

  it(`should add a when property to the class`, async () => {
    // @ts-ignore
    expect(new TestClass().when).toBeInstanceOf(Function)
    // @ts-ignore
    expect(await new TestClass().when()).toBe(true)
  })
})
