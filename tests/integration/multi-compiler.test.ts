import setup from '@repo/test-kit/setup'
import {testIsCompiledCss, testIsCompiledJs} from '@repo/test-kit/tests'
import {describe, expect, it} from 'vitest'

describe(`examples/multi-compiler`, () => {
  it(`should compile assets as expected`, async () => {
    const test = setup({
      dist: `plugin/dist`,
      label: `@examples/multi-compiler`,
    })

    await test.install()
    await test.build()

    testIsCompiledJs(test.getAsset(`plugin.js`))
    testIsCompiledCss(test.getAsset(`plugin.css`))

    expect(test.manifest).toMatchSnapshot()
  })
})
