/* eslint-disable no-console */
import {describe, expect, it} from '@jest/globals'
import {execa} from 'execa'

describe(`@roots/bud-sass`, () => {
  it(`should not throw in development`, async () => {
    let error
    try {
      const child = await execa(`yarn`, [
        `workspace`,
        `@tests/issue-1798`,
        `run`,
        `bud`,
        `dev`,
      ])
    } catch (e) {
      error = e.message?.split(`\n`).pop()
    }

    expect(error).toMatchInlineSnapshot(
      `"… watching project sources                                      ℹ [2mctrl+c to exit[22m"`,
    )
  })

  it(`should throw in production`, async () => {
    let error
    try {
      const {stdout} = await execa(`yarn`, [
        `workspace`,
        `@tests/issue-1798`,
        `run`,
        `bud`,
        `build`,
      ])

      expect(stdout.split(`\n`)[4]).toMatchInlineSnapshot(
        `"[2m│[22m [7mSassError: SassError: Expected escape sequence.[27m"`,
      )
    } catch (e) {
      error = e
    }
    expect(error).toBeUndefined()
  })
})
