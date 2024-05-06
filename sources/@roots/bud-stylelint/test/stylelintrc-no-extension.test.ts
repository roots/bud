import stripAnsi from '@roots/bud-support/strip-ansi'
import {execa} from 'execa'
import {describe, expect, it} from 'vitest'

describe(`bud build with extensionless stylelintrc`, () => {
  it(`should build with expected stdout`, async () => {
    await execa(`yarn`, [`workspace`, `@tests/stylelint-command-with-errors`, `run`, `bud`, `clean`])

    const result = await execa(`yarn`, [
      `workspace`,
      `@tests/stylelintrc-no-extension`,
      `run`,
      `bud`,
      `build`,
      `--force`,
    ])

    const [_s, title, _s2, entry, runtime, css, js, _s3, timings] =
      stripAnsi(result.stdout).split(`\n`)

    expect(stripAnsi(result.stdout).split(/\n/).slice(0, 7).join(`\n`)).toMatchInlineSnapshot(`
      "
      ╭ stylelintrc-no-extension [87e8ac84aafa65f4]                               ./dist
      │
      │ app
      │  ◉ js/runtime.js                                                     ✔ 904 bytes
      │  ◉ css/app.css                                                        ✔ 23 bytes
      │  ◉ js/app.js                                                         ✔ 264 bytes"
    `)

    expect(result.exitCode).toBe(0)
  })
})
