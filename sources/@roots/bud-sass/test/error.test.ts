/* eslint-disable no-console */
import {describe, expect, it} from '@jest/globals'
import {execa} from 'execa'

describe(`@roots/bud-sass`, () => {
  it(`should not throw in development`, async () => {
    const process = await execa(
      `yarn`,
      [
        `workspace`,
        `@tests/issue-1798`,
        `run`,
        `bud`,
        `build`,
        `development`,
        `--no-cache`,
      ],
      {
        reject: false,
        timeout: 5000,
      },
    )

    expect(process.stderr?.split(`\n`).pop()).toMatchInlineSnapshot(`""`)
    expect(process.stdout?.split(`\n`).pop()).toMatchInlineSnapshot(
      `"… watching project sources                                      ℹ [2mctrl+c to exit[22m"`,
    )
    expect(process.exitCode).toBe(undefined)
  })

  it(`should throw in production`, async () => {
    const process = await execa(
      `yarn`,
      [
        `workspace`,
        `@tests/issue-1798`,
        `run`,
        `bud`,
        `build`,
        `production`,
        `--no-cache`,
      ],
      {
        reject: false,
        encoding: `utf8`,
        timeout: 5000,
      },
    )

    expect(process.stderr).toMatchInlineSnapshot(`""`)
    expect(process.stdout?.split(`\n`)[4]).toMatchInlineSnapshot(
      `"[2m│[22m [7mSassError: SassError: Expected escape sequence.[27m"`,
    )
    expect(process.exitCode).toBe(1)
  })
})
