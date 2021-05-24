import {Bud, config, services} from '@roots/bud'

describe('hashed filenames', () => {
  it('is not applied by default', () => {
    const instance = new Bud(config)
      .bootstrap(services)
      .lifecycle()

    const filename = instance.build.config.output.filename
    expect(filename).toEqual('[name].js')
  })

  it('is configurable by bud.hash', () => {
    const instance = new Bud(config)
      .bootstrap(services)
      .lifecycle()
      .hash()

    expect(instance.build.config.output.filename).toEqual(
      '[name].[contenthash].js',
    )
  })
})

export {}
