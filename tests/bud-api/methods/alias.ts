import {Framework, setupBud, teardownBud} from '../../util'

describe('webpack.resolve.alias', function () {
  let bud: Framework

  beforeEach(() => {
    bud = setupBud()
  })

  afterEach(() => {
    teardownBud(bud)
  })

  it('is configurable by bud.alias', () => {
    bud.alias({'@foo': 'bar'})

    expect(bud.build.config.resolve.alias).toEqual({
      '@foo': bud.path('project', 'bar'),
    })
  })
})
