import {Bud, config, factory} from '@roots/bud'

describe.skip('bud.path', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  beforeEach(() => {
    bud.hooks.on<'location.project'>(
      'location.project',
      () => config.location.project,
    )
  })

  it('returns the correct project path', () => {
    const path = bud.path('project')

    expect(path).toEqual(config.location.project)
    expect(
      bud.hooks.filter<'location.project'>('location.project'),
    ).toEqual(path)
  })
})
