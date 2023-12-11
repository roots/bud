import {execa} from '@roots/bud-support/execa'
import stripAnsi from '@roots/bud-support/strip-ansi'
import {describe, expect, it} from 'vitest'

describe(`bud stylelint command (with errors)`, () => {
  it(`should return 1`, async () => {
    await execa(`yarn`, [`workspace`, `@tests/stylelint-command-with-errors`, `run`, `bud`, `clean`])

    const result = await execa(`yarn`, [
      `workspace`,
      `@tests/stylelint-command-with-errors`,
      `run`,
      `bud`,
      `stylelint`,
    ], {
      reject: false,
    })

    expect(stripAnsi(result.stdout)).toContain(`1 problem (1 error, 0 warnings)`)
    expect(result.exitCode).toBe(1)
  })
})
