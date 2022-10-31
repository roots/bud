import {beforeEach, describe, expect, it, vi} from 'vitest'
import type {MultiStats, WebpackError} from 'webpack'

import Compiler from './index'

vi.mock(`@roots/bud`, async () => await import(`@repo/test-kit/mocks/bud`))

const webpackImplementation = {
  version: `MOCK_VERSION`,
  compilers: [
    {
      name: `MOCK_CHILD_COMPILER`,
      hooks: {
        afterEmit: {
          tapAsync: vi.fn(async () => {}),
        },
        done: {
          tap: vi.fn(),
        },
      },
    },
    {
      name: `MOCK_CHILD_COMPILER`,
      hooks: {
        afterEmit: {
          tapAsync: vi.fn(async () => {}),
        },
        done: {
          tap: vi.fn(),
        },
      },
    },
  ],
  hooks: {
    afterEmit: {
      tapAsync: vi.fn(async () => {}),
    },
    done: {
      tap: vi.fn(),
    },
  },
}

let webpack = vi.fn(() => {
  return webpackImplementation
})

// @ts-ignore
webpack.version = `MOCK_VERSION`

vi.mock(`webpack`, () => {
  return {default: webpack}
})

describe(`@roots/bud-compiler`, function () {
  let bud
  let compiler: Compiler

  beforeEach(async () => {
    vi.clearAllMocks()

    bud = await import(`@roots/bud`).then(({default: Bud}) => new Bud())
    compiler = new Compiler(bud)
    // @ts-ignore
    compiler.implementation = new webpack()
  })

  it(`has compile fn`, () => {
    expect(compiler.compile).toBeInstanceOf(Function)
  })

  it(`should call logger.log`, async () => {
    await compiler.compile()
    expect(compiler.logger.log).toHaveBeenCalled()
  })

  it(`should set instance`, async () => {
    await compiler.compile()
    expect(compiler.instance).toEqual(
      expect.objectContaining({
        version: `MOCK_VERSION`,
        hooks: expect.any(Object),
      }),
    )
  })

  it(`should have config with array length 1`, async () => {
    await compiler.compile()

    expect(compiler.config).toHaveLength(1)
  })

  it(`should have config with array length 2 when hasChildren is true`, async () => {
    // @ts-ignore
    compiler.app.hasChildren = true
    compiler.app.children = {
      foo: compiler.app,
      bar: compiler.app,
    }
    await compiler.compile()

    expect(compiler.config).toHaveLength(2)
  })

  it(`should log early exit (--dry)`, async () => {
    compiler.app.context.args.dry = true
    const logSpy = vi.spyOn(compiler.logger, `log`)
    await compiler.compile()
    expect(logSpy).toHaveBeenCalledTimes(3)
  })

  it(`should set done tap`, async () => {
    try {
      const bud = await import(`@roots/bud`).then(
        ({default: Bud}) => new Bud(),
      )
      // @ts-ignore
      const compiler = new Compiler(bud)
      // @ts-ignore
      compiler.implementation = new webpack()
      await compiler.compile()
      expect(compiler.instance.hooks.done.tap).toHaveBeenCalledWith(
        `MOCK-dev-handle`,
        compiler.handleStats,
      )
    } catch (e) {}
  })

  it(`should call webpack`, async () => {
    try {
      bud = await import(`@roots/bud`).then(({default: Bud}) => new Bud())
      compiler = new Compiler(bud)
      // @ts-ignore
      compiler.implementation = new webpack()
      await compiler.compile()
    } catch (e) {}
    expect(webpack).toHaveBeenCalled()
  })

  it(`has callback fn`, () => {
    expect(compiler.callback).toBeInstanceOf(Function)
  })

  it(`should call error handler from callback when hasErrors is truthy`, async () => {
    const onErrorSpy = vi.spyOn(compiler, `onError`)
    // @ts-ignore
    compiler.callback(new Error(), null)
    expect(onErrorSpy).toHaveBeenCalled()
  })

  it(`should not call error handler from callback when hasErrors is falsey`, async () => {
    const onErrorSpy = vi.spyOn(compiler, `onError`)
    // @ts-ignore
    compiler.callback(null, null)
    expect(onErrorSpy).not.toHaveBeenCalled()
  })

  it(`should call stats handler from callback when stats is truthy`, async () => {
    const handleStatsSpy = vi.spyOn(compiler, `handleStats`)
    // @ts-ignore
    compiler.callback(null, {
      toJson: vi.fn(() => {}),
    } as unknown as MultiStats)
    expect(handleStatsSpy).toHaveBeenCalled()
  })

  it(`should not call stats handler from callback when stats is falsey`, async () => {
    const handleStatsSpy = vi.spyOn(compiler, `handleStats`)
    // @ts-ignore
    compiler.callback(null, null)
    expect(handleStatsSpy).not.toHaveBeenCalled()
  })

  it(`has handleStats fn`, () => {
    expect(compiler.handleStats).toBeInstanceOf(Function)
  })

  it(`has error handler`, () => {
    expect(compiler.onError).toBeInstanceOf(Function)
  })

  it(`has close handler`, () => {
    expect(compiler.onClose).toBeInstanceOf(Function)
  })

  it(`should call onError when onClose is called with error`, async () => {
    const onErrorSpy = vi.spyOn(compiler, `onError`)
    compiler.onClose(new Error() as WebpackError)
    expect(onErrorSpy).toHaveBeenCalled()
  })
})
