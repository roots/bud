import {Rule} from '@roots/bud-build'
import {Framework, setupBud, teardownBud} from '../util'

describe('Build rule', function () {
  let bud: Framework

  beforeEach(() => {
    bud = setupBud()
  })

  afterEach(() => {
    teardownBud(bud)
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
