import {factory, Framework} from '@roots/bud'
import {alias} from '@roots/bud-api/src/Repository/alias'

describe('webpack.resolve.alias', function () {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory()
  })

  afterAll(done => {
    bud.close(done)
  })

  it('is a function', () => {
    expect(alias).toBeInstanceOf(Function)
  })

  it('is configurable by bud.alias', () => {
    alias.bind(bud)({'@foo': 'bar'})

    bud.build.make()

    expect(bud.build.config.resolve.alias).toEqual({
      '@foo': bud.path('project', 'bar'),
    })
  })
})
