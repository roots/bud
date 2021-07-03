import {
  Framework,
  setupBud,
  config,
  teardownBud,
} from '../../util'

describe('bud.path', function () {
  let bud: Framework

  beforeAll(() => {
    bud = setupBud('production')
    return
  })

  afterAll(() => {
    teardownBud(bud)
    return
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

export {}
