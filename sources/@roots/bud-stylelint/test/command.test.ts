import {execa} from 'execa'
import {describe, expect, it} from 'vitest'

describe(`bud stylelint command`, () => {
  it(`should return 0`, async () => {
    await execa(`yarn`, [`workspace`, `@tests/stylelint-command-with-errors`, `run`, `bud`, `clean`])

    const result = await execa(`yarn`, [
      `workspace`,
      `@tests/stylelint-command`,
      `run`,
      `bud`,
      `stylelint`,
    ])

    expect(result.stdout).toMatchInlineSnapshot(`
      "› stylelint @src/**/*.{css,sass,scss}
      ✔ success"
    `)
    expect(result.exitCode).toBe(0)
  })
})
