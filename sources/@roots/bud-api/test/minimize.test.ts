import type {Bud} from '@roots/bud-framework'

import {factory} from '@repo/test-kit'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import '../src/index.js'
import {minimize as minimizeFn} from '../src/methods/minimize'

describe(`@roots/bud-api/methods/minimize`, () => {
  let bud: Bud
  let minimize: minimizeFn

  beforeEach(async () => {
    bud = await factory()
    minimize = minimizeFn.bind(bud)
  })

  it(`should enable minimizers when called with truthy value`, () => {
    const spies = [
      vi.spyOn(bud.minimizers.css, `enable`),
      vi.spyOn(bud.minimizers.js, `enable`),
      vi.spyOn(bud.minimizers, `enable`),
    ]
    const value = true

    minimize(value)

    spies.map(spy => expect(spy).toHaveBeenCalledWith(value))
  })

  it(`should disable minimizers when called with falsy value`, () => {
    const spies = [
      vi.spyOn(bud.minimizers.css, `enable`),
      vi.spyOn(bud.minimizers.js, `enable`),
      vi.spyOn(bud.minimizers, `enable`),
    ]
    const value = false

    minimize(value)

    spies.map(spy => expect(spy).toHaveBeenCalledWith(value))
  })

  it(`should enable a specific minimizer when called with a key`, () => {
    const spies = [
      vi.spyOn(bud.minimizers.css, `enable`),
      vi.spyOn(bud.minimizers.js, `enable`),
      vi.spyOn(bud.minimizers, `enable`),
    ]
    const value = `css`

    minimize(value)

    expect(spies.pop()).toHaveBeenCalledWith(true)
    expect(spies.pop()).toHaveBeenCalledWith(false)
    expect(spies.pop()).toHaveBeenCalledWith(true)
  })

  it(`should enable a specific minimizer when called with an array of keys`, () => {
    const spies = [
      vi.spyOn(bud.minimizers.css, `enable`),
      vi.spyOn(bud.minimizers.js, `enable`),
      vi.spyOn(bud.minimizers, `enable`),
    ]
    const value: [`js`] = [`js`]

    minimize(value)

    expect(spies.pop()).toHaveBeenCalledWith(true)
    expect(spies.pop()).toHaveBeenCalledWith(true)
    expect(spies.pop()).toHaveBeenCalledWith(false)
  })

  it(`should return bud`, () => {
    expect(minimize()).toEqual(bud)
  })
})
