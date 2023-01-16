import '../types.js'

import {beforeEach, describe, expect, it, vi} from 'vitest'
import {Bud, factory} from '@repo/test-kit/bud'

import {BudImageminSharp} from './sharp.js'

describe(`@roots/bud-imagemin`, () => {
  let bud: Bud
  let sharp: BudImageminSharp

  beforeEach(async () => {
    bud = await factory()
    sharp = new BudImageminSharp(bud)
  })

  it(`should be constructable`, () => {
    expect(BudImageminSharp).toBeInstanceOf(Function)
  })

  it(`should register sharp accessor`, async () => {
    await bud.extensions.add(BudImageminSharp)
    expect(sharp).toBeInstanceOf(BudImageminSharp)
  })

  it(`should call build.optimization.minimizer hook from configAfter`, async () => {
    await sharp.init()
    sharp.generators.clear()
    const onSpy = vi.spyOn(bud.hooks, `on`)
    await sharp.configAfter(bud)

    expect(onSpy).toHaveBeenCalledWith(
      `build.optimization.minimizer`,
      expect.any(Function),
    )
  })
})
