import {Bud, factory} from '@repo/test-kit'
import Acorn from '@roots/sage/acorn'
import {beforeEach, describe, expect, it, vi} from 'vitest'

describe(`@roots/sage/acorn`, async () => {
  let bud: Bud
  let acorn: Acorn

  beforeEach(async () => {
    bud = await factory()
    acorn = new Acorn(bud)
  })

  it(`should set publicPath to empty strings`, async () => {
    bud.entrypoints.set(`publicPath`, `FOO`)
    bud.manifest.set(`publicPath`, `FOO`)

    let result = await acorn.buildBefore(bud)
    expect(result).toBe(undefined)

    expect(bud.entrypoints.get(`publicPath`)).toBe(``)
    expect(bud.manifest.get(`publicPath`)).toBe(``)
  })

  it(`should execute webpack apply in development`, async () => {
    const bud = await factory({mode: `development`})
    const mockCompiler = {hooks: {thisCompilation: {tap: vi.fn((...args) => {})}}}
    // @ts-ignore
    const result = new Acorn(bud).apply(mockCompiler)

    expect(mockCompiler.hooks.thisCompilation.tap).toHaveBeenCalled()
    expect(result).toBe(true)
  })

  it(`should not execute webpack apply in production`, async () => {
    const bud = await factory({mode: `production`})

    const mockCompiler = {hooks: {thisCompilation: {tap: vi.fn((...args) => {})}}}
    // @ts-ignore
    const result = new Acorn(bud).apply(mockCompiler)

    expect(mockCompiler.hooks.thisCompilation.tap).not.toHaveBeenCalled()
    expect(result).toBe(false)
  })

  it(`should return a fn from addAcornHotManifest`, async () => {
    const bud = await factory({mode: `development`})
    const mockCompiler = {webpack: {sources: {RawSource: vi.fn((...args) => {})}}} as any
    const mockCompilation = {emitAsset: vi.fn((...args) => {})} as any

    const publicPathSpy = vi.spyOn(bud, `publicPath`)

    const result = new Acorn(bud).addAcornHotManifest(mockCompiler, mockCompilation)

    expect(publicPathSpy).toHaveBeenCalledOnce()
    expect(result).toEqual(expect.any(Function))

    result()
    expect(mockCompiler.webpack.sources.RawSource).toHaveBeenCalledWith(expect.stringContaining(`"publicPath": ""`))
    expect(mockCompilation.emitAsset).toHaveBeenCalledOnce()
  })
})
