import {Bud, factory} from '@repo/test-kit'
import Compiler from '@roots/bud-compiler'
import webpack from '@roots/bud-support/webpack'
import {beforeAll, describe, expect, it, vi} from 'vitest'

describe(`@roots/bud-compiler`, function () {
  let bud: Bud
  let compiler: Compiler
  let logSpy: any

  beforeAll(async () => {
    bud = await factory({mode: `development`})
    compiler = new Compiler(() => bud)
    logSpy = vi.spyOn(compiler.logger, `log`)
    await compiler.register?.(bud)
    await compiler.compile(bud)
  })

  it(`should have implementation`, () => {
    expect(compiler.implementation).toBe(webpack)
  })

  it(`should have compile fn`, () => {
    expect(compiler.compile).toBeInstanceOf(Function)
  })

  it(`should have onStats fn`, () => {
    expect(compiler.onStats).toBeInstanceOf(Function)
  })

  it(`should have error handler`, () => {
    expect(compiler.onError).toBeInstanceOf(Function)
  })

  it(`should have close handler`, () => {
    expect(compiler.onError).toBeInstanceOf(Function)
  })

  it(`should have sourceError transformer`, () => {
    expect(compiler.sourceErrors).toBeInstanceOf(Function)
  })

  it(`should call logger.log`, async () => {
    expect(logSpy).toHaveBeenCalled()
  })

  it(`should have config with array length 1`, async () => {
    expect(compiler.config).toHaveLength(1)
  })

  it(`should set done tap`, async () => {
    try {
      expect(compiler.instance.hooks.done.tap).toHaveBeenCalledWith(
        `MOCK-dev-handle`,
        compiler.onStats,
      )
    } catch (e) {}
  })
})
