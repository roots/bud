import {execa} from 'execa'
import {describe, expect, it} from 'vitest'
import stripAnsi from '@roots/bud-support/strip-ansi'

describe(`bud build with extensionless stylelintrc`, () => {
  it(`should build with expected stdout`, async () => {
    const result = await execa(`yarn`, [
      `workspace`,
      `@tests/stylelintrc-no-extension`,
      `run`,
      `bud`,
      `build`,
    ])

    const [_s, title, _s2, entry, runtime, css, js, _s3, timings] = stripAnsi(result.stdout).split(`\n`)

    expect(title).toMatch(/╭ stylelintrc-no-extension \[.*\].*\.\/dist/)
    expect(entry).toMatch(/│ app/)
    expect(runtime).toMatch(/│  ◉ js\/runtime\.js\s*✔ \d* bytes/)
    expect(css).toMatch(/│  ◉ css\/app\.css\s*✔ \d* bytes/)
    expect(js).toMatch(/│  ◉ js\/app\.js.*✔ \d* bytes/)
    expect(timings).toMatch(/╰ .*ms 3 modules \[.\/3 modules cached\]/)
    expect(_s).toEqual(``)
    expect(_s2).toMatch(/│/)
    expect(_s3).toMatch(/│/)

    expect(result.exitCode).toBe(0)
  })
})
