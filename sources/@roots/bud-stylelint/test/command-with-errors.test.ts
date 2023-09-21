import {describe, expect, it} from 'vitest'
import noop from '@roots/bud-support/lodash/noop'
import {execa} from '@roots/bud-support/execa'

describe(`bud stylelint command (with errors)`, () => {
  it(`should return 1`, async () => {
    const result = await execa(`yarn`, [
      `workspace`,
      `@tests/stylelint-command-with-errors`,
      `run`,
      `bud`,
      `stylelint`,
    ], {
      reject: false,
    }).catch(() => {
      return {stdout: ``, stderr: ``, exitCode: null}
    })

    expect(result.stdout).toMatchInlineSnapshot(`
      "› stylelint @src/**/*.{css,sass,scss}

      src/app.css
       1:1  ✖  Unexpected empty source  no-empty-source

      1 problem (1 error, 0 warnings)
      "
    `)
    expect(result.stderr).toMatchInlineSnapshot('"✘ exiting with code 1"')
    expect(result.exitCode).toBe(1)
  })
})
