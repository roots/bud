import {execa} from 'execa'
import {describe, expect, it} from 'vitest'

describe(`bud build with extensionless stylelintrc`, () => {
  it(`should return 0`, async () => {
    const result = await execa(`yarn`, [
      `workspace`,
      `@tests/stylelintrc-no-extension`,
      `run`,
      `bud`,
      `build`,
    ])

    expect(result.exitCode).toBe(0)
  })
})
