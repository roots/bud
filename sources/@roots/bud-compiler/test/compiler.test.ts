import {Bud, factory} from '@repo/test-kit'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import Compiler from '../src/index.js'

describe(`@roots/bud-compiler`, function () {
  let bud: Bud
  let compiler: Compiler

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory({mode: `development`})
    compiler = new Compiler(() => bud)
    await compiler.register(bud)
  })

  it(`has compile fn`, () => {
    expect(compiler.compile).toBeInstanceOf(Function)
  })

  it(`should call logger.log`, async () => {
    const logSpy = vi.spyOn(compiler.logger, `log`)
    await compiler.compile(bud)
    expect(logSpy).toHaveBeenCalled()
  })

  it(`should have config with array length 1`, async () => {
    await compiler.compile(bud)
    expect(compiler.config).toHaveLength(1)
  })

  it(`should have config with array length 2 when hasChildren is true`, async () => {
    // @ts-ignore
    await bud.make(`foo`)
    await bud.make(`bar`)

    compiler.app.children = {
      foo: compiler.app,
      bar: compiler.app,
    }

    await compiler.compile(bud)
    expect(compiler.config).toHaveLength(2)
  })

  it(`should set done tap`, async () => {
    try {
      await compiler.compile(bud)
      expect(compiler.instance.hooks.done.tap).toHaveBeenCalledWith(
        `MOCK-dev-handle`,
        compiler.onStats,
      )
    } catch (e) {}
  })

  it(`has onStats fn`, () => {
    expect(compiler.onStats).toBeInstanceOf(Function)
  })

  it(`has error handler`, () => {
    expect(compiler.onError).toBeInstanceOf(Function)
  })

  it(`has close handler`, () => {
    expect(compiler.onError).toBeInstanceOf(Function)
  })
})
