import {describe, expect, it, jest} from '@jest/globals'
import {dirname} from 'node:path'

import {globAssets} from './entry.glob.js'

const callback = jest.fn() as any
const bud = {
  label: `bud`,
  path: jest.fn(() => dirname(import.meta.url)),
  hooks: {
    on: jest.fn((_label: string, value: any) => {
      return callback(value())
    }),
  },
  warn: jest.fn(),
} as any

describe(`entry glob`, function () {
  let method: typeof globAssets

  beforeEach(async () => {
    method = globAssets.bind(bud)
    jest.clearAllMocks()
  })

  it(`is a function`, () => {
    expect(method).toBeInstanceOf(Function)
  })

  it(`should return array`, async () => {
    const ret = await method(`foo`)
    expect(ret).toStrictEqual(expect.arrayContaining([`foo`]))
  })

  it(`should throw when a non array/string is passed`, async () => {
    try {
      // @ts-ignore
      expect(await method({foo: `foo`})).toThrowError()
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
    }
  })
})
