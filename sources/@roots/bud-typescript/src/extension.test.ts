import {beforeAll, describe, expect, it} from '@jest/globals'
import {Bud, factory} from '@repo/test-kit/bud'
import {assert} from 'console'

import Extension from './index'

describe(`@roots/bud-typescript`, () => {
  let bud: Bud
  let typescript

  beforeAll(async () => {
    bud = await factory()
    typescript = new Extension(bud)
    await typescript._register()
    await bud.extensions.add(Extension)
  })

  it(`is exposed`, () => {
    expect(typescript).toBeInstanceOf(Extension)
  })

  it(`is labeled`, () => {
    expect(typescript.label).toBe(`@roots/bud-typescript`)
  })

  it(`sets up ts module rule`, async () => {
    await bud.extensions.runAll(`configAfter`)
    expect(bud.build.rules.ts).toBeDefined()
  })

  it(`adds ts handling`, () => {
    assert(bud.hooks.filter(`build.resolve.extensions`).has(`.ts`))
  })

  it(`adds tsx handling`, () => {
    assert(bud.hooks.filter(`build.resolve.extensions`).has(`.tsx`))
  })
})
