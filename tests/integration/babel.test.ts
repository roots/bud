import setup, {Project} from '@repo/test-kit/setup'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`examples/babel`, () => {
  let test: Project

  beforeAll(async () => {
    test = await setup({label: `@examples/babel`}).install()
    await test.build()
  })

  it(`should compile js as expected`, async () => {
    expect(test.getAsset(`app.js`).length).toBeGreaterThan(10)
    expect(test.getAsset(`app.js`).includes(`import `)).toBeFalsy()
    expect(test.manifest).toMatchSnapshot()
  })
})
