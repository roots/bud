import {Project} from '../util/integration'

jest.setTimeout(60000)

describe('examples/react', () => {
  let project: Project

  beforeAll(async () => {
    project = new Project({
      name: 'react',
      dir: 'examples/react',
    })

    await project.setup()
  })

  it('[app.js] has contents', () => {
    expect(project.assets['app.js'].length).toBeGreaterThan(10)
  })

  it('[app.js] is transpiled', () => {
    expect(
      project.assets['app.js'].includes('import'),
    ).toBeFalsy()
  })

  it('[app.css] is transpiled', () => {
    expect(project.assets['app.css']).toMatchSnapshot()
  })
})
