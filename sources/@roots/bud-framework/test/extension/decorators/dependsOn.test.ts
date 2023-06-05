import {describe, expect, it} from 'vitest'

import {dependsOn} from '../../../src/extension/decorators/dependsOn.js'

// @ts-ignore
@dependsOn([`foo`])
class TestClass {}

describe(`dependsOn`, () => {
  it(`should return a decorator`, () => {
    // @ts-ignore
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
