import {readFile} from 'fs-extra'
import {join} from 'path'

import {Project} from '../util/integration'

jest.setTimeout(60000)

describe('examples/sass', () => {
  let project: Project

  beforeAll(async () => {
    project = new Project({
      name: 'sass',
      dir: 'examples/sass',
    })

    await project.setup()
  })

  it('manifest.yml is unchanged', async () => {
    const artifact = await readFile(
      join(process.cwd(), 'examples/sass/bud.config.yml'),
    )

    expect(artifact.toString()).toMatchSnapshot()
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
