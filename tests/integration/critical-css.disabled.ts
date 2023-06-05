import {Project} from '@repo/test-kit/project'
import * as FS from '@roots/bud-support/filesystem'
import {join} from 'path'
import {beforeAll, describe, expect, it} from 'vitest'

describe.skip(`critical-css`, () => {
  let project: Project
  let fs: FS.Filesystem

  beforeAll(async () => {
    fs = new FS.Filesystem()
    project = await new Project({
      label: `@examples/critical-css`,
    }).setup()
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
