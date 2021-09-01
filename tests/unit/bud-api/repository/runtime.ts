import {factory, Framework} from '@roots/bud'

describe('bud.runtime', function () {
  let bud: Framework

  beforeAll(() => {
    bud = factory()
  })

  afterAll(done => {
    bud.close(done)
  })

  it('is a function', () => {
    expect(bud.runtime).toBeInstanceOf(Function)
  })

  it('enables runtime when called', () => {
    bud.runtime()

    const {name} = bud.hooks.filter(
      'build/optimization/runtimeChunk',
    )

    expect(name({name: 'app'})).toEqual(`runtime/app`)
  })

  it('can be passed a custom runtimeChunk config', () => {
    bud.runtime('single')

    expect(
      bud.hooks.filter('build/optimization/runtimeChunk'),
    ).toEqual('single')
  })

  it('disables runtimeChunk when passed a boolean false', () => {
    bud.runtime(false)

    expect(
      bud.hooks.filter('build/optimization/runtimeChunk'),
    ).toEqual(false)
  })
})
