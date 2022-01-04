import {Bud, factory} from '../../../util/bud'

describe('bud.hash', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it('is a function', () => {
    expect(bud.hash).toBeInstanceOf(Function)
  })

  it('enables hashing when called', async () => {
    bud.hash()

    await bud.build.make()

    expect(bud.build.config.output.filename).toEqual(
      '[name].[contenthash:6].js',
    )
  })
})
