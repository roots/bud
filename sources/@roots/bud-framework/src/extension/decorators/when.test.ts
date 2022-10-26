import {describe, expect, it} from '@jest/globals'

import {when} from './when'

@when(async () => true)
// @ts-ignore
class TestClass {}

describe(`when`, () => {
  it(`should return a decorator`, async () => {
    expect(when(async () => true)).toBeInstanceOf(Function)
  })

  it(`should add a when property to the class`, async () => {
    // @ts-ignore
    expect(new TestClass().when).toBeInstanceOf(Function)
    // @ts-ignore
    expect(await new TestClass().when()).toBe(true)
  })
})
