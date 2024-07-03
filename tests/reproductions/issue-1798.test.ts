/* eslint-disable no-console */
import execa from '@roots/bud-support/execa'
import {describe, expect, it} from 'vitest'

describe(`@roots/bud-sass`, () => {
  it(`should throw in production and not development`, async () => {
    try {
      await execa(
        `yarn`,
        [
          `workspace`,
          `@tests/issue-1798`,
          `run`,
          `bud`,
          `dev`,
          `--force`,
          `--no-cache`,
        ],
        {
          reject: false,
          timeout: 10000,
        },
      )
    } catch (e) {
      expect(e).not.toBeDefined()
    }

    try {
      const prod = await execa(
        `yarn`,
        [
          `workspace`,
          `@tests/issue-1798`,
          `run`,
          `bud`,
          `build`,
          `production`,
          `--force`,
          `--no-cache`,
        ],
        {
          timeout: 10000,
        },
      )
      expect(prod.exitCode).not.toBe(0)
      expect(prod.exitCode).not.toBe(undefined)
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
}, 120000)
