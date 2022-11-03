import {describe, expect, it} from 'vitest'

import {dependsOnOptional} from './dependsOnOptional'

@dependsOnOptional([`foo`])
// @ts-ignore
class TestClass {}

describe(`dependsOnOptional`, () => {
  it(`should return a decorator`, () => {
    expect(dependsOnOptional([`foo`])).toBeInstanceOf(Function)
  })

  it(`should add a dependsOnOptional property to the class`, () => {
    // @ts-ignore
    expect(new TestClass().dependsOnOptional).toBeInstanceOf(Set)
    // @ts-ignore
    expect(Array.from(new TestClass().dependsOnOptional)).toStrictEqual(
      expect.arrayContaining([`foo`]),
    )
  })
})
