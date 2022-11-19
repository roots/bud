import {beforeEach, describe, expect, it, vi} from 'vitest'
import {Bud, factory} from '@repo/test-kit/bud'
import {when as source} from './when'

describe(`bud.when`, () => {
  let bud: Bud
  let when: source

  beforeEach(async () => {
    bud = await factory()
    when = source.bind(bud)
  })

  it(`should be a function`, () => {
    expect(when).toBeInstanceOf(Function)
  })

  it(`should execute the false case`, () => {
    const trueCase = vi.fn()
    const falseCase = vi.fn()
    when(false, trueCase, falseCase)
    expect(falseCase).toHaveBeenCalledTimes(1)
    expect(trueCase).not.toHaveBeenCalled()
  })

  it(`should execute the false case when value is fn that returns false`, () => {
    const trueCase = vi.fn()
    const falseCase = vi.fn()
    when(() => false, trueCase, falseCase)
    expect(falseCase).toHaveBeenCalledTimes(1)
    expect(trueCase).not.toHaveBeenCalled()
  })

  it(`should execute the false case when value is a array with a false item`, () => {
    const trueCase = vi.fn()
    const falseCase = vi.fn()
    when([true, false], trueCase, falseCase)
    expect(falseCase).toHaveBeenCalledTimes(1)
    expect(trueCase).not.toHaveBeenCalled()
  })
  it(`should execute the false case when value is an array with a false returning fn`, () => {
    const trueCase = vi.fn()
    const falseCase = vi.fn()
    when([true, () => false], trueCase, falseCase)
    expect(falseCase).toHaveBeenCalledTimes(1)
    expect(trueCase).not.toHaveBeenCalled()
  })

  it(`should execute the true case`, () => {
    const trueCase = vi.fn()
    const falseCase = vi.fn()
    when(true, trueCase, falseCase)
    expect(trueCase).toHaveBeenCalledTimes(1)
    expect(falseCase).not.toHaveBeenCalled()
  })

  it(`should execute the true case`, () => {
    const trueCase = vi.fn()
    const falseCase = vi.fn()
    when(true, trueCase, falseCase)
    expect(trueCase).toHaveBeenCalledTimes(1)
    expect(falseCase).not.toHaveBeenCalled()
  })

  it(`should execute the true case when value is fn that returns true`, () => {
    const trueCase = vi.fn()
    const falseCase = vi.fn()
    when(() => true, trueCase, falseCase)
    expect(trueCase).toHaveBeenCalledTimes(1)
    expect(falseCase).not.toHaveBeenCalled()
  })

  it(`should execute the true case when value is a array with all true items`, () => {
    const trueCase = vi.fn()
    const falseCase = vi.fn()
    when([true, true], trueCase, falseCase)
    expect(trueCase).toHaveBeenCalledTimes(1)
    expect(falseCase).not.toHaveBeenCalled()
  })

  it(`should execute the true case when value is an array with all true items including true returning fns`, () => {
    const trueCase = vi.fn()
    const falseCase = vi.fn()
    when([true, () => true], trueCase, falseCase)
    expect(trueCase).toHaveBeenCalledTimes(1)
    expect(falseCase).not.toHaveBeenCalled()
  })
})
