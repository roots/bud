import {Rule} from '@roots/bud-build'
import {Bud, Framework, config, services} from '@roots/bud'

describe('Build rule', function () {
  it('is constructable', () => {
    const rule = {
      test: /.foo$/,
    }

    expect(new Rule(rule)).toBeInstanceOf(Rule)
  })

  it('produces a rule', () => {
    const bud: Framework = new Bud(config)
      .bootstrap(services)
      .lifecycle()

    const rule = {
      test: /.foo$/,
    }

    expect(new Rule(rule).make(bud)).toEqual({test: /.foo$/})
  })
})

export {}
