import {Project} from '../util/integration'

jest.setTimeout(60000)

describe('examples/tailwindcss', () => {
  let project: Project

  beforeAll(async () => {
    project = new Project({
      name: 'tailwindcss',
      dir: 'examples/tailwindcss',
    })

    await project.setup()
  })

  describe('package.json', () => {
    it('matches snapshot', () => {
      expect(project.packageJson).toMatchSnapshot()
    })
  })

  it('[app.js] has contents', () => {
    expect(project.assets['app.js'].length).toBeGreaterThan(10)
  })

  it('[app.js] is transpiled', () => {
    expect(
      project.assets['app.js'].includes('import'),
    ).toBeFalsy()
  })

  it('[app.css] has contents', () => {
    expect(project.assets['app.css'].length).toBeGreaterThan(10)
  })

  it('[app.css] is transpiled', () => {
    expect(project.assets['app.css'].includes('@import')).toBe(
      false,
    )
  })

  it('[app.css] @tailwind directive is transpiled', () => {
    expect(project.assets['app.css'].includes('@apply')).toBe(
      false,
    )
  })

  it('[app.css] has whitespace removed', () => {
    expect(project.assets['app.css'].match(/    /)).toBeFalsy()
  })

  it('[app.css] has breaks removed', () => {
    expect(project.assets['app.css'].match(/\\n/)).toBeFalsy()
  })

  it('[app.css] matches snapshot', () => {
    expect(project.assets['app.css']).toMatchSnapshot()
  })

  it('[jit] is used to build css', () => {
    expect(
      project.assets['app.css'].match(/w-\\\[800px\\\]/),
    ).toBeTruthy()
  })
})
