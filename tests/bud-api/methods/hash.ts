import {Bud, config, services} from '@roots/bud'

describe('bud.hash', function () {
  beforeEach(() => {
    this.bud = new Bud(config).bootstrap(services).lifecycle()
  })

  it('enables hashing when called', () => {
    this.bud.hash()

    expect(this.bud.build.config.output.filename).toEqual(
      '[name].[contenthash].js',
    )
  })
})

export {}
