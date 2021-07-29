import {Framework, setupBud, teardownBud} from '../../util'

describe('webpack.resolve.alias', function () {
  let bud: Framework

  beforeAll(() => {
    bud = setupBud()
  })

  afterAll(() => {
    teardownBud(bud)
  })

  it('is a function', () => {
    expect(bud.alias).toBeInstanceOf(Function)
  })

  it('is configurable by bud.alias', () => {
    bud.alias({'@foo': 'bar'})

    expect(bud.build.config.resolve.alias).toEqual({
      '@foo': bud.path('project', 'bar'),
    })
  })
})
