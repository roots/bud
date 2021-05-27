import {Bud, config, services} from '@roots/bud'
import {Rule} from '@roots/bud-build'

describe('Build rule', function () {
  beforeEach(() => {
    this.bud = new Bud(config).bootstrap(services).lifecycle()
  })

  it('is constructable', () => {
    expect(
      new Rule({
        test: /.foo$/,
      }),
    ).toBeInstanceOf(Rule)
  })
})

export {}
