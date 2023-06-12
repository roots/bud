import setup from '@repo/test-kit/setup'

import {describe, expect, it} from 'vitest'

describe(`examples/typescript`, () => {
  it(`should compile js and css as expected (bud)`, async () => {
    const test = setup({
      label: `@examples/typescript`,
      buildCommand: [`./node_modules/.bin/bud`, [`build`, `--ci`]],
    })
    await test.install()
    await test.build()

    expect(test.assets[`app.js`].length).toBeGreaterThan(10)
    expect(test.assets[`app.js`].includes(`from '`)).toBeFalsy()
    expect(test.manifest).toMatchSnapshot()
  })

  it(`should compile js and css as expected (ts-bud)`, async () => {
    const test = setup({
      label: `@examples/typescript`,
      buildCommand: [`./node_modules/.bin/ts-bud`, [`build`, `--ci`]],
    })
    await test.install()
    await test.build()

    expect(test.assets[`app.js`].length).toBeGreaterThan(10)
    expect(test.assets[`app.js`].includes(`from '`)).toBeFalsy()
    expect(test.manifest).toMatchSnapshot()
  })
})
