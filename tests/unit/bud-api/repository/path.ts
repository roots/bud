import {config, factory, Framework} from '@roots/bud'

describe('bud.path', function () {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory({config: {ci: true, log: false}})
  })

  afterAll(done => {
    bud.close(done)
  })

  beforeEach(() => {
    bud.hooks.on('location/project', config.location.project)
  })

  it('returns the correct project path', () => {
    const path = bud.path('project')

    expect(path).toEqual(config.location.project)
    expect(bud.hooks.filter('location/project')).toEqual(path)
  })
})
