import {factory} from '@repo/test-kit/bud'
import {describe, expect, it} from 'vitest'

import Extension from '../src/index.js'

describe(`@roots/bud-typescript`, () => {
  it(`should be exposed`, async () => {
    const bud = await factory()
    const typescript = new Extension(bud)
    expect(typescript).toBeInstanceOf(Extension)
  })

  it(`should be labeled`, async () => {
    const bud = await factory()
    const typescript = new Extension(bud)
    expect(typescript.label).toBe(`@roots/bud-typescript`)
  })

  it(`should set up ts module rule`, async () => {
    const bud = await factory()
    const typescript = new Extension(bud)

    await typescript.register(bud)
    await typescript.buildBefore(bud)
    expect(typescript.app.build.rules.ts).toBeDefined()
  })

  it(`should register ts handling`, async () => {
    const bud = await factory()
    const typescript = new Extension(bud)
    await typescript.register(bud)
    await typescript.buildBefore(bud)

    expect(
      typescript.app.hooks.filter(`build.resolve.extensions`),
    ).toContain(`.ts`)
  })

  it(`should register tsx handling`, async () => {
    const bud = await factory()
    const typescript = new Extension(bud)
    await typescript.register(bud)
    await typescript.buildBefore(bud)

    expect(
      typescript.app.hooks.filter(`build.resolve.extensions`),
    ).toContain(`.tsx`)
  })
})
