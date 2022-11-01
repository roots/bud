import {dirname} from 'node:path'

import {beforeEach, describe, expect, it, vi} from 'vitest'

import {globAssets} from './entry.glob.js'

const callback = vi.fn() as any
const bud = {
  label: `bud`,
  path: vi.fn(() => dirname(import.meta.url)),
  hooks: {
    on: vi.fn((_label: string, value: any) => {
      return callback(value())
    }),
  },
  warn: vi.fn(),
} as any

describe(`entry glob`, function () {
  let method: typeof globAssets

  beforeEach(async () => {
    method = globAssets.bind(bud)
    vi.clearAllMocks()
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
