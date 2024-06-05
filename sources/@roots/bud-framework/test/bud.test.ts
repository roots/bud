import type {Context} from '@roots/bud-framework'

import {describe, expect, it} from 'vitest'

import {Bud} from '../src/bud/index.js'

describe(`Bud`, function () {
  it(`is a class`, () => {
    expect(Bud).toBeInstanceOf(Function)
  })

  it(`is a constructor`, () => {
    expect(new Bud({} as Context)).toBeInstanceOf(Bud)
  })

  it(`throws when constructed with no context`, async () => {
    try {
      // @ts-ignore
      expect(new Bud()).toThrowError()
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
    }
  })

  it(`has an executeServiceCallbacks method`, async () => {
    expect(new Bud({} as Context).executeServiceCallbacks).toBeInstanceOf(
      Function,
    )
  })
})
