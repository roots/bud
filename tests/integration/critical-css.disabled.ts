import {Project} from '@repo/test-kit/project'
import * as fs from '@roots/bud-support/fs'
import {join} from 'path'
import {beforeAll, describe, expect, it} from 'vitest'

describe.skip(`critical-css`, () => {
  let project: Project

  beforeAll(async () => {
    project = await new Project({
      label: `@examples/critical-css`,
    }).setup()
  })

  it(`should emit critical dist/critical/css/app.css`, async () => {
    const artifact = await fs.readFile(
      join(
        process.cwd(),
        `examples/critical-css/dist/critical/css/app.css`,
      ),
    )
    expect(artifact.toString()).toMatchSnapshot()
  })
})
