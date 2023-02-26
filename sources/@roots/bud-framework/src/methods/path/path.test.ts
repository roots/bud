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

  it(`is a function`, () => {
    expect(path).toBeInstanceOf(Function)
  })

  it(`returns string`, () => {
    expect(path(`@src`, `test`)).toEqual(expect.any(String))
  })

  it(`call app.hooks.hasSyncHook`, () => {
    const hasSyncHookSpy = vi.spyOn(bud.hooks, `hasSyncHook`)
    path(`@src`, `test`)
    expect(hasSyncHookSpy).toHaveBeenCalledWith(`location.@src`)
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
    expect(path(`@name`)).toEqual(`[name]`)
  })
  it(`resolves @path`, async () => {
    expect(path(`@path`)).toEqual(`[path]`)
  })
  it(`resolves @hash`, async () => {
    bud.hooks.on(`feature.hash`, true)
    expect(path(`@hash`)).toEqual(`[contenthash:6]`)
  })
  it(`resolves @hash to empty string when disabled`, async () => {
    bud.hooks.on(`feature.hash`, false)
    expect(path(`@hash`)).toEqual(`[contenthash:6]`)
  })

  it(`resolves @ext`, async () => {
    expect(path(`@ext`)).toEqual(`[ext]`)
  })

  it(`resolves @dist/@name`, () =>
    expect(path(`@dist/@name`)).toMatch(/dist\/\[name\]/))
})
