import '@roots/bud-imagemin/types'

import {beforeEach, describe, expect, it, vi} from 'vitest'
import {Bud, factory} from '@repo/test-kit/bud'

import BudImageminSvgo from './index.js'

describe(`@roots/bud-imagemin`, () => {
  let bud: Bud
  let svgo: BudImageminSvgo

  beforeEach(async () => {
    bud = await factory()
    svgo = new BudImageminSvgo(bud)
  })

  it(`should be constructable`, () => {
    expect(BudImageminSvgo).toBeInstanceOf(Function)
  })

  it(`should register bud.imagemin accessor`, async () => {
    await bud.extensions.add(BudImageminSvgo)
    expect(svgo).toBeInstanceOf(BudImageminSvgo)
  })

  it(`should call build.optimization.minimizer hook from configAfter`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)
    await svgo.configAfter(bud)

    expect(onSpy).toHaveBeenCalledWith(
      `build.optimization.minimizer`,
      expect.any(Function),
    )
  })
})
