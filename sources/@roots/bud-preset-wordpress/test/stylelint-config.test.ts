import * as stylelint from 'stylelint'
import {describe, expect, it} from 'vitest'

describe(`@roots/bud-preset-wordpress/stylelint`, () => {
  it(`should error without rule`, async () => {
    const result = await stylelint.lint({
      code: `
        .foo {
          color: var(--wp--preset--color--primary);
        }
      `,
      config: {
        extends: [
          `@roots/bud-sass/stylelint-config`,
        ],
      },
    })

    expect(result.errored).toBe(true)
  })

  it(`should not error with rule`, async () => {
    const result = await stylelint.lint({
      code: `
        .foo {
          color: var(--wp--preset--color--primary);
        }
      `,
      config: {
        extends: [
          `@roots/bud-sass/stylelint-config`,
          `@roots/bud-preset-wordpress/stylelint`,
        ],
      },
    })

    expect(result.errored).toBe(false)
  })
})