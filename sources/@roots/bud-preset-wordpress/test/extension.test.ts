import '../src/index.js'

import '@roots/bud-tailwindcss'
import '@roots/bud-wordpress-theme-json'

import {Bud, factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import BudPresetWordPress from '../src/index.js'

describe(`@roots/bud-preset-wordpress`, () => {
  let bud: Bud
  let extension: BudPresetWordPress

  beforeEach(async () => {
    bud = await factory()
    extension = new BudPresetWordPress(bud)
  })

  it(`should have label`, async () => {
    expect(extension.label).toBe(`@roots/bud-preset-wordpress`)
  })

  it(`should have register method`, async () => {
    expect(extension.boot).toBeInstanceOf(Function)
  })

  it(`should register @roots/bud-tailwind-theme-json when @roots/bud-tailwindcss is available`, async () => {
    await bud.extensions.add(`@roots/bud-tailwindcss`)
    await extension.boot(bud)
    expect(
      bud.extensions.get(`@roots/bud-tailwindcss-theme-json`),
    ).toBeTruthy()
  })

  it(`should register extensions`, async () => {
    const addSpy = vi.spyOn(bud.extensions, `add`)

    await bud.extensions.add(BudPresetWordPress)

    expect(addSpy).toHaveBeenNthCalledWith(1, BudPresetWordPress)

    expect(bud.extensions.has(`@roots/bud-postcss`)).toBe(true)
    expect(bud.extensions.has(`@roots/bud-react`)).toBe(true)
    expect(
      bud.extensions.get(`@roots/bud-wordpress-manifests`),
    ).toBeTruthy()
    expect(
      bud.extensions.get(`@roots/bud-wordpress-theme-json`),
    ).toBeTruthy()
  })
})
