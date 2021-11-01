import {Project} from '../util/integration'

jest.setTimeout(60000)

describe('examples/preset-recommend', () => {
  let project: Project

  beforeAll(async () => {
    project = new Project({
      name: 'preset-recommend',
      dir: 'examples/preset-recommend',
    })

    await project.setup()
  })

  it('[main.js] has contents', () => {
    expect(project.assets['main.js'].length).toBeGreaterThan(10)
  })

  it('[main.js] is transpiled', () => {
    expect(
      project.assets['main.js'].includes('import'),
    ).toBeFalsy()
  })

  it('[main.css] is transpiled', () => {
    expect(project.assets['main.css']).toMatchSnapshot()
  })
})
