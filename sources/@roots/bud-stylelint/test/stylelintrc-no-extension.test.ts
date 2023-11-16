import stripAnsi from '@roots/bud-support/strip-ansi'
import {execa} from 'execa'
import {describe, expect, it} from 'vitest'

describe(`bud build with extensionless stylelintrc`, () => {
  it(`should build with expected stdout`, async () => {
    const result = await execa(`yarn`, [
      `workspace`,
      `@tests/stylelintrc-no-extension`,
      `run`,
      `bud`,
      `build`,
    ])

    const [_s, title, _s2, entry, runtime, css, js, _s3, timings] =
      stripAnsi(result.stdout).split(`\n`)

    expect(title).toMatch(/╭ stylelintrc-no-extension \[.*\].*\.\/dist/)
    expect(entry).toMatch(/│ app/)
    expect(runtime).toMatch(/│  ◉ js\/runtime\.js\s/)
    expect(css).toMatch(/│  ◉ css\/app\.css\s/)
    expect(js).toMatch(/│  ◉ js\/app\.js./)
    expect(timings).toMatch(/╰ .*ms \d* modules \[.\/\d* modules cached\]/)
    expect(_s).toEqual(``)
    expect(_s2).toMatch(/│/)
    expect(_s3).toMatch(/│/)

    expect(result.exitCode).toBe(0)
  })
})
