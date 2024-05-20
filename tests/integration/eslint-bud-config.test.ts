import setup from '@repo/test-kit/setup'
import {describe, expect, it} from 'vitest'

describe(`examples/eslint-bud-config`, () => {
  it(`should compile assets as expected`, async () => {
    const test = setup({
      label: `@examples/eslint-bud-config`,
    })
    await test.install()
    await test.build()

    const log = await test.read(`build.stdout.log`)

    expect(log).toMatch(/eslint-bud-config\s/)
    expect(log).toMatch(
      /1:1  error  Unexpected console statement  no-console/,
    )
  })
})
