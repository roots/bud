import {execa} from 'execa'
import {describe, expect, it} from 'vitest'
import stripAnsi from '@roots/bud-support/strip-ansi'

describe(`bud build with extensionless stylelintrc`, () => {
  it(`should return 1`, async () => {
    const result = await execa(`yarn`, [
      `workspace`,
      `@tests/stylelint-command-with-errors`,
      `run`,
      `bud`,
      `build`,
    ], {reject: false})

    expect(stripAnsi(result.stdout)).toContain(`│ │ 1 problem (1 error, 0 warnings)`)
    expect(result.exitCode).toBe(1)
  })
})
