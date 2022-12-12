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
})
