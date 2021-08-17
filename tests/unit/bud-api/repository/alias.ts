import {config, factory, Framework} from '@roots/bud'

describe('webpack.resolve.alias', function () {
  let bud: Framework

  beforeAll(() => {
    bud = factory({
      mode: 'development',
      config: {...config, ci: true},
    })
  })

  afterAll(done => {
    bud.close(done)
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
