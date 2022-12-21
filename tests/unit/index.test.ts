/* eslint-disable n/no-process-env */
import {factory} from '@repo/test-kit/bud'
import {describe, expect, it} from 'vitest'

describe(`test environment sanity checks`, () => {
  it(`should run a test without errors`, () => {
    expect(true).toBe(true)
  })

  it(`should run an async test without errors`, async () => {
    await new Promise(resolve =>
      setTimeout(() => resolve(expect(true).toBe(true)), 10),
    )
  })

  it(`bud should be prevented from auto-loading extensions`, async () => {
    const bud = await factory({mode: `production`})
    expect(bud.extensions.repository).not.toHaveProperty(
      `@roots/bud-postcss`,
    )
    expect(bud.extensions.repository).not.toHaveProperty(`@roots/bud-swc`)
    expect(bud.extensions.repository).not.toHaveProperty(
      `@roots/bud-tailwindcss`,
    )
    expect(bud.extensions.repository).not.toHaveProperty(
      `@roots/bud-babel`,
    )
  })
})
