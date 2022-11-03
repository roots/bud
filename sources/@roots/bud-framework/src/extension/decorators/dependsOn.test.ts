import {describe, expect, it} from 'vitest'

import {dependsOn} from './dependsOn.js'

@dependsOn([`foo`])
// @ts-ignore
class TestClass {}

describe(`dependsOn`, () => {
  it(`should return a decorator`, () => {
    expect(dependsOn([`foo`])).toBeInstanceOf(Function)
  })

  it(`should add a dependsOn property to the class`, () => {
    // @ts-ignore
    expect(new TestClass().dependsOn).toBeInstanceOf(Set)
    // @ts-ignore
    expect(Array.from(new TestClass().dependsOn)).toStrictEqual(
      expect.arrayContaining([`foo`]),
    )
  })
})
