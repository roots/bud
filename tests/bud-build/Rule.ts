import {Rule} from '@roots/bud-build'
import {Framework, setupBud, teardownBud} from '../util'

const SUITE = 'Build Rule'

describe(SUITE, function () {
  let bud: Framework = null

  beforeAll(done => {
    bud = setupBud()
    done()
  })

  afterAll(done => {
    bud = teardownBud(bud)
    done()
  })

  it('is constructable', done => {
    const rule = {test: /.foo$/}
    expect(new Rule(rule)).toBeInstanceOf(Rule)
    done()
  })

  it('make', done => {
    const rule = {test: /.foo$/}
    expect(new Rule(rule).make(bud)).toEqual({test: /.foo$/})
    done()
  })

  it('getUse', done => {
    const input = [bud.build.items.md]
    const rule = new Rule({test: /.foo$/, use: input})

    expect(rule.getUse(bud)).toEqual(input)
    done()
  })

  it('setUse', done => {
    const input = () => [bud.build.items.raw, bud.build.items.md]
    const rule = new Rule({test: /.foo$/})
    rule.setUse(input)

    expect(rule.use).toEqual(input)
    done()
  })

  it('getTest', done => {
    const input = /.foo$/
    const rule = new Rule({test: input})

    expect(rule.getTest(bud)).toEqual(input)
    done()
  })

  it('setTest', done => {
    const input = () => /.js$/
    const rule = new Rule({test: /.foo$/})
    rule.setTest(input)

    expect(rule.test).toEqual(input)
    done()
  })

  /* it('getExclude', () => {
    const exclude = /.foo$/
    const rule = new Rule({test: /.foo$/, exclude: exclude})

    expect(rule.getExclude(bud)).toBe(exclude)
  })

  it('setExclude', () => {
    const input = () => /.js$/
    const rule = new Rule({test: /.foo$/})
    rule.setExclude(input)

    expect(rule.exclude).toBe(input)
  }) */
})

export {}
