import {join} from 'node:path'

import {Bud, factory} from '@repo/test-kit'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {path as subject} from '../../../src/methods/path'

describe(`bud.path`, () => {
  let bud: Bud
  let path: subject

  beforeEach(async () => {
    vi.clearAllMocks()

    bud = await factory()

    path = subject.bind(bud)
  })

  it(`is a function`, () => {
    expect(path).toBeInstanceOf(Function)
  })

  it(`returns string`, () => {
    expect(path(`@src`, `test`)).toEqual(expect.any(String))
  })

  it(`resolves a relative path`, () => {
    const resolved = path(`foo`)
    expect(resolved).toBe(join(bud.context.basedir, `foo`))
  })
  it(`resolves a relative multipart path`, () => {
    const resolved = path(`foo`, `bar`, `baz`)
    expect(resolved).toBe(join(bud.context.basedir, `foo`, `bar`, `baz`))
  })

  it(`resolves @name`, async () => {
    expect(path(`@name`)).toEqual(join(bud.context.basedir, `[name]`))
  })
  it(`resolves @path`, async () => {
    expect(path(`@path`)).toEqual(join(bud.context.basedir, `[path]`))
  })
  it(`resolves @hash`, async () => {
    bud.context.hash = true
    expect(path(`@hash`)).toEqual(
      join(bud.context.basedir, `[contenthash:6]`),
    )
  })
  it(`resolves @hash to empty string when disabled`, async () => {
    bud.context.hash = false
    expect(path(`@hash`)).toEqual(
      join(bud.context.basedir, `[contenthash:6]`),
    )
  })

  it(`resolves @ext`, async () => {
    expect(path(`@ext`)).toEqual(join(bud.context.basedir, `[ext]`))
  })

  it(`resolves @dist/@name`, () =>
    expect(path(`@dist/@name`)).toMatch(/dist\/\[name\]/))
})
