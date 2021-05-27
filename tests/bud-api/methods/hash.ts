import {Bud, Framework, config, services} from '@roots/bud'

describe('bud.hash', function () {
  let bud: Framework

  beforeEach(() => {
    bud = new Bud(config).bootstrap(services).lifecycle()
  })

  it('enables hashing when called', () => {
    bud.hash()

    expect(bud.build.config.output.filename).toEqual(
      '[name].[contenthash].js',
    )
  })
})

export {}
