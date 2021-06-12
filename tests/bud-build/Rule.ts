import {Rule} from '@roots/bud-build'
import {Framework, setupBud, teardownBud} from '../util'

describe('Build Rule', function () {
  let bud: Framework = null

  beforeAll(() => {
    bud = setupBud()
  })

  afterAll(() => {
    bud = teardownBud(bud)
  })

  it('is constructable', () => {
    const rule = {test: /.foo$/}
    expect(new Rule(rule)).toBeInstanceOf(Rule)
  })

  it('make', () => {
    const rule = {test: /.foo$/}
    expect(new Rule(rule).make(bud)).toEqual({test: /.foo$/})
  })

  it('getUse', () => {
    const input = [bud.build.items.md]
    const rule = new Rule({test: /.foo$/, use: input})

    expect(rule.getUse(bud)).toEqual(input)
  })

  it('setUse', () => {
    const input = () => [bud.build.items.raw, bud.build.items.md]
    const rule = new Rule({test: /.foo$/})
    rule.setUse(input)

    expect(rule.use).toEqual(input)
  })

  it('getTest', () => {
    const input = /.foo$/
    const rule = new Rule({test: input})

    expect(rule.getTest(bud)).toEqual(input)
  })

  it('setTest', () => {
    const input = () => /.js$/
    const rule = new Rule({test: /.foo$/})
    rule.setTest(input)

    expect(rule.test).toEqual(input)
  })

  it('getExclude', () => {
    const definition = {
      test: /.foo$/,
      exclude: /.bar$/,
    }

    const rule = new Rule(definition)

    expect(rule.getExclude(bud)).toEqual(definition.exclude)
  })

  it('setExclude from fn', () => {
    const rule = new Rule({test: /.foo$/})

    const mutationFn = () => /.js$/
    rule.setExclude(mutationFn)

    expect(rule.exclude).toEqual(mutationFn)
  })

  it('setExclude from obj', () => {
    const rule = new Rule({test: /.foo$/})

    const mutation = /.js$/
    rule.setExclude(mutation)

    expect<RegExp>(rule.exclude(bud)).toStrictEqual<RegExp>(
      mutation,
    )
  })
})

export {}
