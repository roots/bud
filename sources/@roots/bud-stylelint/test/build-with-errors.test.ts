import stripAnsi from '@roots/bud-support/strip-ansi'
import {execa} from 'execa'
import {describe, expect, it} from 'vitest'

describe(`bud build with extensionless stylelintrc`, () => {
  it(`should return 1`, async () => {
    await execa(
      `yarn`,
      [
        `workspace`,
        `@tests/stylelint-build-with-errors`,
        `run`,
        `bud`,
        `clean`,
      ],
      {reject: false},
    )

    const result = await execa(
      `yarn`,
      [
        `workspace`,
        `@tests/stylelint-build-with-errors`,
        `run`,
        `bud`,
        `build`,
      ],
      {reject: false},
    )

    expect(stripAnsi(result.stdout)).toContain(`╰ 1 error`)
    expect(result.exitCode).toBe(1)
  })
})
