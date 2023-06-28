import {Bud, factory} from '@repo/test-kit'
import {beforeAll, describe, expect, it} from 'vitest'

import Extension from '../src/index.js'

describe(`@roots/bud-typescript`, () => {
  let bud: Bud
  let typescript: Extension

  beforeAll(async () => {
    bud = await factory()
    typescript = new Extension(bud)
    await typescript.register(bud)
    await typescript.buildBefore(bud)
  })

  it(`is exposed`, async () => {
    expect(typescript).toBeInstanceOf(Extension)
  })

  it(`is labeled`, async () => {
    expect(typescript.label).toBe(`@roots/bud-typescript`)
  })

  it(`sets up ts module rule`, async () => {
    expect(typescript.app.build.rules.ts).toBeDefined()
  })

  it(`adds ts handling`, async () => {
    expect(
      typescript.app.hooks.filter(`build.resolve.extensions`),
    ).toContain(`.ts`)
  })

  it(`adds tsx handling`, async () => {
    expect(
      typescript.app.hooks.filter(`build.resolve.extensions`),
    ).toContain(`.tsx`)
  })
})
