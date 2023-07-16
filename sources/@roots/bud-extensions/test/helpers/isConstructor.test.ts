import {describe, expect, it} from 'vitest'
import {isConstructor} from '@roots/bud-extensions/helpers/isConstructor'

describe('isConstructor', () => {
  it('should return true for a constructor function', () => {
    class TestClass {}
    expect(isConstructor(TestClass)).toBe(true)
  })

  it('should return false for a non-constructor function', () => {
    const testFunction = () => {}
    expect(isConstructor(testFunction)).toBe(false)
  })

  it('should return false for a non-function object', () => {
    const testObject = {}
    expect(isConstructor(testObject)).toBe(false)
  })

  it('should return false for a primitive value', () => {
    expect(isConstructor('test')).toBe(false)
  })
})
