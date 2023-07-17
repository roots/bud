import {join} from 'path'

import {type Project, default as setup} from '@repo/test-kit/setup'
import {testIsCompiledCss} from '@repo/test-kit/tests'
import * as FS from '@roots/bud-support/filesystem'
import {beforeAll, describe, it} from 'vitest'

describe(`critical-css`, () => {
  let test: Project
  let fs: FS.Filesystem

  beforeAll(async () => {
    fs = new FS.Filesystem()
    test = setup({label: `@examples/critical-css`})
    await test.install()
    await test.build()
  })

  it(`should emit critical dist/critical/css/app.css`, async () => {
    const criticalStylesheet = await fs.read(
      join(test.getPath(), `dist/critical/css/app.css`),
    )
    testIsCompiledCss(criticalStylesheet)
  })

  it(`should emit dist/css/app.css`, async () => {
    const criticalStylesheet = await fs.read(
      join(test.getPath(), `dist/css/app.css`),
    )
    testIsCompiledCss(criticalStylesheet)
  })
})
