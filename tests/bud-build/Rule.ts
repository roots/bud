import {Rule} from '@roots/bud-build'
import {Bud, Framework, config, services} from '@roots/bud'

describe('Build rule', function () {
  let bud: Framework

  beforeEach(() => {
    bud = new Bud(config).bootstrap(services).lifecycle()
  })

  afterEach(() => {
    bud.server.watcher.close()
  })

  it('is constructable', () => {
    const rule = {
      test: /.foo$/,
    }

    expect(new Rule(rule)).toBeInstanceOf(Rule)
  })

  it('produces a rule', () => {
    const rule = {test: /.foo$/}
    expect(new Rule(rule).make(bud)).toEqual({test: /.foo$/})
  })
})

export {}
