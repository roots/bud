import {describe, expect, it, jest} from '@jest/globals'

import {Facade} from './facade'
import * as facade from './facade.factory'

const mockBud = {
  api: {
    queue: [],
  },
}

describe(`facade`, () => {
  let factory

  beforeEach(async () => {
    jest.clearAllMocks()
  })

  it(`should have a Facade class`, () => {
    expect(Facade).toBeInstanceOf(Function)
  })

  it(`should do its thang`, async () => {
    const returnedValue = facade.factory(`foo`)
    expect(returnedValue).toBeInstanceOf(Function)
  })

  it(`should add to the queue`, async () => {
    facade.factory(`foo`).bind(mockBud)()
    expect(mockBud.api.queue).toStrictEqual([[`foo`, []]])
  })
})
