import {readFile} from 'fs-extra'
import {join} from 'path'

import {Project} from '@repo/test-kit/project'

jest.setTimeout(60000)

describe('examples/sass', () => {
  let project

  beforeAll(async () => {
    project = new Project({
      name: 'sass',
      dir: 'examples/sass',
    })

    await project.setup()
  })

  it('src/app.scss is unchanged', async () => {
    const artifact = await readFile(
      join(process.cwd(), 'examples/sass/src/app.scss'),
    )

    expect(artifact.toString()).toMatchSnapshot()
  })

  it('scss is transpiled', () => {
    expect(project.assets['app.css']).toMatchSnapshot()
  })
})
