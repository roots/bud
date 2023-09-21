import {execa} from 'execa'
import {describe, expect, it} from 'vitest'

describe(`bud build with extensionless stylelintrc`, () => {
  it(`should return 0`, async () => {
    const result = await execa(`yarn`, [
      `workspace`,
      `@tests/stylelint-command-with-errors`,
      `run`,
      `bud`,
      `build`,
    ])

    expect(result.stdout).toMatchInlineSnapshot(`
      "
      ╭ stylelint-command-with-errors [3244904a84f8f4f6]                          ./dist
      │
      │ app
      │  ◉ js/runtime.js                                                     ✔ 933 bytes
      │  ◉ css/app.css                                                               ✔ ø
      │
      ╰ 105ms 2 modules [2/2 modules cached]
      "
    `)

    expect(result.exitCode).toBe(1)
  })
})
