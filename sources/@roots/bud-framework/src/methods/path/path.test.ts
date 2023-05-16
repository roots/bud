import {join} from 'node:path'

import {beforeEach, describe, expect, it, vi} from 'vitest'
import {Bud, factory} from '@repo/test-kit/bud'
import {path as subject} from './path.js'

describe(`bud.path`, () => {
  let bud: Bud
  let path: subject

  beforeEach(async () => {
    vi.clearAllMocks()

    bud = await factory()

    path = subject.bind(bud)
  })

  it(`should be a function`, () => {
    expect(path).toBeInstanceOf(Function)
  })

  it(`should return a string`, () => {
    expect(path(`@src`, `test`)).toEqual(expect.any(String))
  })

  it(`should resolve a relative path`, () => {
    const resolved = path(`foo`)
    expect(resolved).toBe(join(bud.context.basedir, `foo`))
  })
  it(`should resolve a relative multipart path`, () => {
    const resolved = path(`foo`, `bar`, `baz`)
    expect(resolved).toBe(join(bud.context.basedir, `foo`, `bar`, `baz`))
  })

  it(`should resolve @name`, async () => {
    expect(path(`@name`)).toEqual(join(bud.context.basedir, `[name]`))
  })
  it(`should resolve @path`, async () => {
    expect(path(`@path`)).toEqual(join(bud.context.basedir, `[path]`))
  })
  it(`should resolve @hash`, async () => {
    bud.hooks.on(`feature.hash`, true)
    expect(path(`@hash`)).toEqual(
      join(bud.context.basedir, `[contenthash:6]`),
    )
  })
  it(`should resolve @hash to empty string when disabled`, async () => {
    bud.hooks.on(`feature.hash`, false)
    expect(path(`@hash`)).toEqual(
      join(bud.context.basedir, `[contenthash:6]`),
    )
  })

  it(`should resolve @ext`, async () => {
    expect(path(`@ext`)).toEqual(join(bud.context.basedir, `[ext]`))
  })

  it(`should resolve @dist/@name`, () =>
    expect(path(`@dist/@name`)).toMatch(/dist\/\[name\]/))
})
