import {default as setup, type Project} from '@repo/test-kit/setup'

import * as FS from '@roots/bud-support/filesystem'
import {join} from 'path'
import {beforeAll, describe, expect, it} from 'vitest'

describe.skip(`critical-css`, () => {
  let test: Project
  let fs: FS.Filesystem

  beforeAll(async () => {
    fs = new FS.Filesystem()
    test = setup({label: `@examples/critical-css`})
    await test.install()
    await test.build()
  })

  it(`should emit critical dist/critical/css/app.css`, async () => {
    const artifact = await fs.read(
      join(
        process.cwd(),
        `examples/critical-css/dist/critical/css/app.css`,
      ),
    )
    expect(artifact.toString()).toMatchSnapshot()
  })
})
