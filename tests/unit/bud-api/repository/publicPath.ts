import {factory, Framework} from '@roots/bud'

describe('bud.publicPath', function () {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory({config: {ci: true, log: false}})
    bud.build.make()
  })

  afterAll(done => {
    bud.close(done)
  })

  it('publicPath: is a function', () => {
    expect(bud.publicPath).toBeInstanceOf(Function)
  })

  it('publicPath: returns the correct default publicPath', () => {
    expect(bud.publicPath()).toEqual('')
    expect(bud.publicPath()).toEqual(
      bud.build.config.output.publicPath,
    )
  })

  it('setPublicPath: is a function', () => {
    expect(bud.setPublicPath).toBeInstanceOf(Function)
  })

  it('setPublicPath: sets publicPath when called', () => {
    const newPath = '/foo'

    bud.setPublicPath(newPath)

    bud.build.make()
    expect(bud.build.config.output.publicPath).toEqual(newPath)
  })
})
