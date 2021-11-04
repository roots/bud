import {factory, Framework} from '@roots/bud'

const NEW_PATH = `${process.cwd()}/foo`

describe.skip('bud.setPath', function () {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory({config: {ci: true, log: false}})
  })

  afterAll(done => {
    bud.close(done)
  })

  it('is a function', () => {
    expect(bud.setPath).toBeInstanceOf(Function)
  })

  it('returns the Framework', () => {
    expect(bud.setPath('project', NEW_PATH)).toBeInstanceOf(
      Framework,
    )
  })

  it('properly sets path', () => {
    bud.setPath('project', NEW_PATH)
    expect(bud.path('project')).toEqual(NEW_PATH)
  })

  it('properly sets multiple paths', () => {
    const value = {
      project: NEW_PATH,
      src: 'foo',
      dist: 'bar',
    }

    bud.setPath(value)

    expect(bud.path('project')).toBe(value.project)
    expect(bud.path('src')).toEqual(
      `${value.project}/${value.src}`,
    )
    expect(bud.path('dist')).toEqual(
      `${value.project}/${value.dist}`,
    )
  })
})
