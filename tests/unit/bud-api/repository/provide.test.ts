import {Bud, factory} from '../../../util/bud'

describe('bud.provide', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it('is a function', () => {
    expect(bud.provide).toBeInstanceOf(Function)
  })

  it('modifies webpack-provide-plugin options', async () => {
    bud.provide({jQuery: ['$']})

    await bud.api.processQueue()

    expect(
      bud.extensions.get('webpack-provide-plugin').options.all(),
    ).toEqual({$: 'jQuery'})
  })
})
