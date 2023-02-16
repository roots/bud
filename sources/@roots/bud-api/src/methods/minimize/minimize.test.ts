import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {minimize as minimizeFn} from './index.js'

describe(`bud.minimize`, () => {
  let bud
  let minimize

  beforeEach(async () => {
    bud = await factory()
    minimize = minimizeFn.bind(bud)
  })

  it(`should call bud.hooks.on when called`, () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)
    minimize()
    expect(onSpy).toHaveBeenCalled()
  })

  it(`should call mockExtension.enable when called with truthy value`, () => {
    const terser = bud.extensions.get(`@roots/bud-terser`)
    const enableSpy = vi.spyOn(terser, `enable`)
    minimize(true)
    expect(enableSpy).toHaveBeenCalled()
  })

  it(`should call mockExtension.enable when called with falsy value`, () => {
    const terser = bud.extensions.get(`@roots/bud-terser`)
    const enableSpy = vi.spyOn(terser, `enable`)
    minimize(false)
    expect(enableSpy).toHaveBeenCalledWith(false)
  })

  it(`should call bud.success to log param`, () => {
    const logSpy = vi.spyOn(bud, `success`)
    minimize()
    expect(logSpy).toHaveBeenCalledWith(`minimize`, true)
  })

  it(`should call bud.success to log param`, () => {
    const logSpy = vi.spyOn(bud, `success`)
    minimize(true)
    expect(logSpy).toHaveBeenCalledWith(`minimize`, true)
  })

  it(`should call bud.success to log param`, () => {
    const logSpy = vi.spyOn(bud, `success`)

    minimize(false)
    expect(logSpy).toHaveBeenCalledWith(`minimize`, false)
  })

  it(`should return bud`, () => {
    expect(minimize()).toEqual(bud)
  })
})
