import {factory, Framework} from '@roots/bud'

describe('bud.provide', function () {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory({config: {ci: true, log: false}})
  })

  afterAll(done => {
    bud.close(done)
  })

  it('is a function', () => {
    expect(bud.provide).toBeInstanceOf(Function)
  })

  it('modifies webpack-provide-plugin options', () => {
    bud.provide({jQuery: ['$']})

    expect(
      bud.extensions.get('webpack-provide-plugin').options.all(),
    ).toEqual({$: ['jQuery']})
  })
})
