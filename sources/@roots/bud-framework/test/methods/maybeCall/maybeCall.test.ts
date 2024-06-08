import {Bud, factory} from '@repo/test-kit'
import {beforeAll, describe, expect, it, vi} from 'vitest'

import {maybeCall as subject} from '../../../src/methods/maybeCall/index.js'

describe(`bud.maybeCall`, {retry: 2}, () => {
  let maybeCall: subject
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
    maybeCall = subject.bind(bud)
  })

  it(`is a function`, () => {
    expect(maybeCall).toBeInstanceOf(Function)
  })

  it(`should call function with bud when supplied with no parameters`, async () => {
    const callback = vi.fn(value => value)
    const value = maybeCall(callback)
    expect(callback).toHaveBeenCalledWith(bud)
    expect(value).toBe(bud)
  })

  it(`should call function with parameters when supplied with parameters`, async () => {
    const callback = vi.fn(value => value)
    const value = maybeCall(callback, `...foo`)
    expect(callback).toHaveBeenCalledWith(`...foo`)
    expect(value).toBe(`...foo`)
  })

  it(`should return value when supplied a non-callable value`, async () => {
    const value = maybeCall(`...bar`)
    expect(value).toBe(`...bar`)
  })

  it(`should call function with context when bindable`, async () => {
    const value = maybeCall(function () {
      return this
    })
    expect(value).toBe(bud)
  })
})
