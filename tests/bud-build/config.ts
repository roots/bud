import {Bud, config, services} from '@roots/bud'

describe('bud.build.config', function () {
  beforeEach(() => {
    this.bud = new Bud(config).bootstrap(services).lifecycle()
  })

  it('resolve.alias default is expected', () => {
    expect(this.bud.build.config.resolve.alias).toEqual({})
  })

  it('output.filename default is expected', () => {
    expect(this.bud.build.config.output.filename).toEqual(
      '[name].js',
    )
  })
})

export {}
