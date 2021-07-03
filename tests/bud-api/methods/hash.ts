import {Framework, setupBud, teardownBud} from '../../util'

describe('bud.hash', function () {
  let bud: Framework

  beforeAll(() => {
    bud = setupBud()
  })

  afterAll(() => {
    teardownBud(bud)
  })

  it('is a function', () => {
    expect(bud.hash).toBeInstanceOf(Function)
  })

  it('enables hashing when called', () => {
    bud.hash()

    expect(bud.build.config.output.filename).toEqual(
      '[name].[contenthash:6].js',
    )
  })
})

export {}
