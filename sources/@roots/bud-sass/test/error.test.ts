/* eslint-disable no-console */
import {describe, expect, it} from '@jest/globals'
import {execa} from 'execa'

describe(`@roots/bud-sass`, () => {
  it(`should throw in production and not development`, async () => {
    const dev = await execa(
      `yarn`,
      [
        `workspace`,
        `@tests/issue-1798`,
        `run`,
        `bud`,
        `build`,
        `development`,
        `--no-cache`,
        `--ci`,
      ],
      {
        reject: false,
        timeout: 10000,
      },
    )

    expect(dev.stderr?.split(`\n`).pop()).toMatchInlineSnapshot(`""`)
    expect(dev.stdout?.split(`\n`).pop()).toContain(`compiled with [1m[31m`)
    expect(dev.exitCode).toBe(undefined)

    const prod = await execa(
      `yarn`,
      [
        `workspace`,
        `@tests/issue-1798`,
        `run`,
        `bud`,
        `build`,
        `production`,
        `--no-cache`,
        `--ci`,
      ],
      {
        reject: false,
        encoding: `utf8`,
        timeout: 10000,
      },
    )

    expect(prod.stderr).toMatchInlineSnapshot(`""`)
    expect(prod.stdout).toContain(`compiled with [1m[31m`)
    expect(prod.exitCode).not.toBe(0)
    expect(prod.exitCode).not.toBe(undefined)
  })
})
