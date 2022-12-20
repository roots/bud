import {factory} from '@repo/test-kit/bud'
import {beforeAll, describe, expect, it} from 'vitest'

import {Rule} from './index.js'

describe(`Build Rule`, function () {
  let bud

  beforeAll(async () => {
    bud = await factory()
  })

  it(`is constructable`, () => {
    const rule = {test: /.foo$/}
    expect(new Rule(() => bud, rule)).toBeInstanceOf(Rule)
  })

  it(`make`, () => {
    const rule = {test: /.foo$/}
    expect(new Rule(() => bud, rule).toWebpack()).toEqual({
      test: /.foo$/,
    })
  })

  it(`getUse`, () => {
    const input = [`md`]
    const rule = new Rule(() => bud, {
      test: /.foo$/,
      // @ts-ignore
      use: input,
    })

    expect(rule.getUse()).toEqual(input)
  })

  it(`setUse`, () => {
    const input = [`raw`, `md`]
    const rule = new Rule(() => bud, {test: /.foo$/})
    // @ts-ignore
    rule.setUse(input)

    expect(rule.use).toEqual(input)
  })

  it(`getTest`, () => {
    const input = /.foo$/
    const rule = new Rule(() => bud, {test: input})

    expect(rule.getTest()).toEqual(input)
  })

  it(`setTest`, () => {
    const input = () => /.js$/
    const rule = new Rule(() => bud, {test: /.foo$/})
    rule.setTest(input)

    expect(rule.test).toEqual(input)
  })

  it(`getExclude`, () => {
    const definition = {
      test: /.foo$/,
      exclude: [/.bar$/],
    }

    const rule = new Rule(() => bud, definition)

    expect(rule.exclude).toEqual(definition.exclude)
  })

  it(`setExclude from fn`, () => {
    const rule = new Rule(() => bud, {test: /.foo$/})

    const mutationFn = () => [/.js$/]
    rule.setExclude(mutationFn)

    expect(rule.getExclude()).toEqual([/.js$/])
  })

  it(`setExclude from obj`, () => {
    const rule = new Rule(() => bud, {test: /.foo$/})

    const mutation = [/.js$/]
    rule.setExclude(mutation)

    expect(rule.getExclude()).toStrictEqual(mutation)
  })
})
