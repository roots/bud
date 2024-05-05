import stripAnsi from '@roots/bud-support/strip-ansi'
import {execa} from 'execa'
import {describe, expect, it} from 'vitest'

describe(`bud build with extensionless stylelintrc`, () => {
  it(`should return 1`, async () => {
    await execa(`yarn`, [`workspace`, `@tests/stylelint-command-with-errors`, `run`, `bud`, `clean`])

    const result = await execa(`yarn`, [
      `workspace`,
      `@tests/stylelint-command-with-errors`,
      `run`,
      `bud`,
      `build`,
      `--force`,
    ], {reject: false})

    expect(stripAnsi(result.stdout)).toContain(`╰ 1 error`)
    expect(result.exitCode).toBe(1)
  })
})
