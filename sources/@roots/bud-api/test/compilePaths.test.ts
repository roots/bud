import {BudError} from '@roots/bud-support/errors'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {compilePaths as compilePathsFn} from '../src/methods/compilePaths'

describe(`@roots/bud-api/methods/compilePaths`, function () {
  let mockBud: any
  let compilePaths: compilePathsFn
  let ruleGetTest = vi.fn(rule => `mock_getTest`)
  let ruleSetInclude = vi.fn(() => `mock_setInclude`)
  let error: BudError

  beforeEach(() => {
    class MockBud {
      public api = {
        logger: {
          log: vi.fn(() => null),
        },
      }
      public build = {
        getRule: vi.fn(rule =>
          [`css`, `js`].includes(rule)
            ? {
                getTest: ruleGetTest,
                setInclude: ruleSetInclude,
              }
            : undefined,
        ),
        rules: {
          css: {},
          js: {},
        },
      }
      public catch = vi.fn()
      public hooks = {
        action: vi.fn(async (event, cb) => {
          return await cb(this).catch((errorInstance: BudError) => {
            error = errorInstance
          })
        }),
      }
    }

    mockBud = new MockBud() as any
    compilePaths = compilePathsFn.bind(mockBud)
  })

  it(`should be a function`, () => {
    expect(compilePaths).toBeInstanceOf(Function)
  })

  it(`should return bud`, () => {
    // @ts-ignore
    expect(compilePaths([`/foo`])).toEqual(mockBud)
  })

  it(`should throw when input is undefined`, () => {
    /// @ts-ignore
    compilePaths(1)
    expect(mockBud.catch).toHaveBeenCalledWith(
      `bud.compilePaths: source must be a string or a regular expression.`,
    )
  })

  it(`should throw when provided a null value`, () => {
    // @ts-ignore
    compilePaths(1)
    expect(mockBud.catch).toHaveBeenCalledWith(
      `bud.compilePaths: source must be a string or a regular expression.`,
    )
  })

  it(`should throw when provided a number`, () => {
    // @ts-ignore
    compilePaths(1)
    expect(mockBud.catch).toHaveBeenCalledWith(
      `bud.compilePaths: source must be a string or a regular expression.`,
    )
  })

  it(`should throw when provided a non array object`, () => {
    // @ts-ignore
    compilePaths({})
    expect(mockBud.catch).toHaveBeenCalledWith(
      `bud.compilePaths: source must be a string or a regular expression.`,
    )
  })

  describe(`when a string is provided`, async () => {
    beforeEach(() => {
      // @ts-ignore
      compilePaths(`/foo`)
    })

    it(`should call bud.build.getRule`, async () => {
      expect(mockBud.build.getRule).toHaveBeenCalledWith(`js`)
    })

    it(`should call bud.api.logger.log`, async () => {
      expect(mockBud.api.logger.log).toHaveBeenCalledWith(
        `setting compile paths for mock_getTest`,
      )
    })

    it(`should call rule.setInclude`, async () => {
      expect(ruleSetInclude).toHaveBeenCalledWith([`/foo`])
    })

    it(`should call bud.hooks.action`, async () => {
      expect(mockBud.hooks.action).toHaveBeenCalledWith(
        `build.before`,
        expect.any(Function),
      )
    })
  })

  describe(`when a regular expressions is provided`, async () => {
    beforeEach(() => {
      // @ts-ignore
      compilePaths(/foo/)
    })

    it(`should call bud.build.getRule`, async () => {
      expect(mockBud.build.getRule).toHaveBeenCalledWith(`js`)
    })

    it(`should call bud.api.logger.log`, async () => {
      expect(mockBud.api.logger.log).toHaveBeenCalledWith(
        `setting compile paths for mock_getTest`,
      )
    })

    it(`should call rule.setInclude`, async () => {
      expect(ruleSetInclude).toHaveBeenCalledWith([/foo/])
    })

    it(`should call bud.hooks.action`, async () => {
      expect(mockBud.hooks.action).toHaveBeenCalledWith(
        `build.before`,
        expect.any(Function),
      )
    })
  })

  describe(`when array of strings is provided`, async () => {
    beforeEach(() => {
      // @ts-ignore
      compilePaths([`/foo`])
    })

    it(`should call bud.build.getRule`, async () => {
      expect(mockBud.build.getRule).toHaveBeenCalledWith(`js`)
    })

    it(`should call bud.api.logger.log`, async () => {
      expect(mockBud.api.logger.log).toHaveBeenCalledWith(
        `setting compile paths for mock_getTest`,
      )
    })

    it(`should call rule.setInclude`, async () => {
      expect(ruleSetInclude).toHaveBeenCalledWith([`/foo`])
    })

    it(`should call bud.hooks.action`, async () => {
      expect(mockBud.hooks.action).toHaveBeenCalledWith(
        `build.before`,
        expect.any(Function),
      )
    })
  })

  describe(`when array of regular expressions is provided`, async () => {
    beforeEach(() => {
      // @ts-ignore
      compilePaths([/foo/])
    })

    it(`should call bud.build.getRule`, async () => {
      expect(mockBud.build.getRule).toHaveBeenCalledWith(`js`)
    })

    it(`should call bud.api.logger.log`, async () => {
      expect(mockBud.api.logger.log).toHaveBeenCalledWith(
        `setting compile paths for mock_getTest`,
      )
    })

    it(`should call rule.setInclude`, async () => {
      expect(ruleSetInclude).toHaveBeenCalledWith([/foo/])
    })

    it(`should call bud.hooks.action`, async () => {
      expect(mockBud.hooks.action).toHaveBeenCalledWith(
        `build.before`,
        expect.any(Function),
      )
    })
  })

  describe(`when array of mixed strings and regular expressions is provided`, async () => {
    beforeEach(() => {
      // @ts-ignore
      compilePaths([/foo/, `/bar`])
    })

    it(`should call bud.build.getRule`, async () => {
      expect(mockBud.build.getRule).toHaveBeenCalledWith(`js`)
    })

    it(`should call bud.api.logger.log`, async () => {
      expect(mockBud.api.logger.log).toHaveBeenCalledWith(
        `setting compile paths for mock_getTest`,
      )
    })

    it(`should call rule.setInclude`, async () => {
      expect(ruleSetInclude).toHaveBeenCalledWith([/foo/, `/bar`])
    })

    it(`should call bud.hooks.action`, async () => {
      // @ts-ignore
      expect(mockBud.hooks.action).toHaveBeenCalledWith(
        `build.before`,
        expect.any(Function),
      )
    })
  })

  describe(`when an array of matches is provided`, async () => {
    beforeEach(() => {
      // @ts-ignore
      compilePaths([/foo/], [`js`, `css`])
    })

    it(`should call bud.build.getRule`, async () => {
      expect(mockBud.build.getRule).toHaveBeenCalledWith(`js`)
      expect(mockBud.build.getRule).toHaveBeenCalledWith(`css`)
    })

    it(`should call rule.setInclude`, async () => {
      expect(ruleSetInclude).toHaveBeenCalledWith([/foo/])
    })

    it(`should call bud.hooks.action`, async () => {
      // @ts-ignore
      compilePaths([/foo/], [`css`])
      expect(mockBud.hooks.action).toHaveBeenCalledWith(
        `build.before`,
        expect.any(Function),
      )
    })
  })

  describe(`when an array of matches is provided but it is only partial`, async () => {
    beforeEach(() => {
      // @ts-ignore
      compilePaths([/foo/, `/bar`], [`css`])
    })

    it(`should call bud.build.getRule`, async () => {
      expect(mockBud.build.getRule).not.toHaveBeenCalledWith(`js`)
      expect(mockBud.build.getRule).toHaveBeenCalledWith(`css`)
    })
  })

  describe(`when a non-existent rule is provided`, async () => {
    beforeEach(() => {
      // @ts-ignore
      compilePaths([`/foo`], [`baz`])
    })

    it(`should error`, async () => {
      expect(mockBud.catch).toHaveBeenCalledWith(
        `bud.compilePaths: \`baz\` is not a valid rule name.`,
      )
    })
  })
})
