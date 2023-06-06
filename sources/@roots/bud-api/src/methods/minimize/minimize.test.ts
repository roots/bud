import {type Bud, factory} from '@repo/test-kit'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {minimize as minimizeFn} from './index.js'

describe(`bud.minimize`, () => {
  let bud: Bud
  let minimize: minimizeFn

  beforeEach(async () => {
    bud = await factory()
    minimize = minimizeFn.bind(bud)
  })

  it(`should enable minimizers when called with truthy value`, () => {
    const spies = [
      vi.spyOn(bud.minify.css, `enable`),
      vi.spyOn(bud.minify.js, `enable`),
      vi.spyOn(bud.minify, `enable`),
    ]
    const value = true

    minimize(value)

    spies.map(spy => expect(spy).toHaveBeenCalledWith(value))
  })

  it(`should disable minimizers when called with falsy value`, () => {
    const spies = [
      vi.spyOn(bud.minify.css, `enable`),
      vi.spyOn(bud.minify.js, `enable`),
      vi.spyOn(bud.minify, `enable`),
    ]
    const value = false

    minimize(value)

    spies.map(spy => expect(spy).toHaveBeenCalledWith(value))
  })

  it(`should enable a specific minimizer when called with a key`, () => {
    const spies = [
      vi.spyOn(bud.minify.css, `enable`),
      vi.spyOn(bud.minify.js, `enable`),
      vi.spyOn(bud.minify, `enable`),
    ]
    const value = `css`

    minimize(value)

    expect(spies.pop()).toHaveBeenCalledWith(true)
    expect(spies.pop()).not.toHaveBeenCalled()
    expect(spies.pop()).toHaveBeenCalledWith(true)
  })

  it(`should enable a specific minimizer when called with an array of keys`, () => {
    const spies = [
      vi.spyOn(bud.minify.css, `enable`),
      vi.spyOn(bud.minify.js, `enable`),
      vi.spyOn(bud.minify, `enable`),
    ]
    const value: [`js`] = [`js`]

    minimize(value)

    expect(spies.pop()).toHaveBeenCalledWith(true)
    expect(spies.pop()).toHaveBeenCalledWith(true)
    expect(spies.pop()).not.toHaveBeenCalled()
  })

  it(`should return bud`, () => {
    expect(minimize()).toEqual(bud)
  })
})
