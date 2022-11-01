import {factory} from '@repo/test-kit/bud'
import {describe, expect, it} from 'vitest'

import Extension from './extension'

describe(`@roots/bud-typescript`, () => {
  it(`is exposed`, async () => {
    const bud = await factory()
    const typescript = new Extension(bud)
    expect(typescript).toBeInstanceOf(Extension)
  })

  it(`is labeled`, async () => {
    const bud = await factory()
    const typescript = new Extension(bud)
    expect(typescript.label).toBe(`@roots/bud-typescript`)
  })

  it(`sets up ts module rule`, async () => {
    const bud = await factory()
    const typescript = new Extension(bud)

    await typescript.register(bud)
    await typescript.configAfter(bud)
    expect(typescript.app.build.rules.ts).toBeDefined()
  })

  it(`adds ts handling`, async () => {
    const bud = await factory()
    const typescript = new Extension(bud)
    await typescript.register(bud)
    await typescript.configAfter(bud)

    expect(
      typescript.app.hooks.filter(`build.resolve.extensions`),
    ).toContain(`.ts`)
  })

  it(`adds tsx handling`, async () => {
    const bud = await factory()
    const typescript = new Extension(bud)
    await typescript.register(bud)
    await typescript.configAfter(bud)

    expect(
      typescript.app.hooks.filter(`build.resolve.extensions`),
    ).toContain(`.tsx`)
  })
})
