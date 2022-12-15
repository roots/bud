import {join} from 'node:path'

import {paths} from '@repo/constants'
import {beforeEach, describe, expect, it} from 'vitest'

import Env from './env'

describe(`@roots/bud/context/env`, () => {
  let env: Record<string, any>

  beforeEach(() => {
    env = Env(
      join(
        paths.root,
        `sources`,
        `@roots`,
        `bud`,
        `src`,
        `context`,
        `__fixtures__`,
        `mock`,
      ),
    )
  })

  it(`.env env`, () => {
    expect(env.BUD_PROJECT_ENV_TEST).toEqual(`BUD_PROJECT_ENV_TEST`)
  })

  it(`expand .env`, () => {
    expect(env.BUD_EXPAND_BASE).toEqual(`basic`)
  })

  it(`expanded .env`, () => {
    expect(env.BUD_EXPAND_EXPAND).toEqual(`basic`)
  })

  it(`concatenate expanded .env`, () => {
    expect(env.BUD_EXPAND_CONCAT).toEqual(`basicworks`)
  })

  it(`lower level env interpolated`, () => {
    expect(env.BUD_PROJECT_ENV_TEST_INTERPOLATION).toEqual(
      `BUD_PROJECT_ENV_TEST_INTERPOLATION`,
    )
  })
  it(`lower level env not interpolated`, () => {
    expect(env.BUD_PROJECT_ENV_BAD_INTERPOLATION).toEqual(``)
  })

  it(`malformed env throws`, () => {
    try {
      expect(
        Env(
          join(
            paths.root,
            `sources`,
            `@roots`,
            `bud`,
            `src`,
            `context`,
            `__fixtures__`,
            `mock`,
            `bad-env`,
          ),
        ),
      ).toThrow()
    } catch (e) {}
  })
})
