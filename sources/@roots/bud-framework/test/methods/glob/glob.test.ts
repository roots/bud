import {Bud, factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import * as source from '../../../src/methods/glob/glob.js'

describe(`bud.glob`, function () {
  let bud: Bud
  let glob: source.glob
  let globSync: source.globSync

  beforeEach(async () => {
    bud = await factory()
    glob = source.glob.bind(bud)
    globSync = source.globSync.bind(bud)
  })

  it(`is a function`, () => {
    expect(source.glob).toBeInstanceOf(Function)
    expect(source.globSync).toBeInstanceOf(Function)
  })

  it(`returns glob results from string param`, async () => {
    const results = glob(`@src/**/*.tsx`)
    expect(results).toBeInstanceOf(Promise)
    expect(await results).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`scripts/index.tsx`),
        expect.stringContaining(`scripts/scripts.tsx`),
        expect.stringContaining(`scripts/components/app.tsx`),
      ]),
    )

    const syncResults = globSync(`@src/**/*.tsx`)
    expect(syncResults).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`scripts/index.tsx`),
        expect.stringContaining(`scripts/scripts.tsx`),
        expect.stringContaining(`scripts/components/app.tsx`),
      ]),
    )
  })

  it(`calls bud.success and bud.info`, async () => {
    const infoSpy = vi.spyOn(bud, `info`)
    const successSpy = vi.spyOn(bud, `success`)

    await glob([`src/**/*.tsx`, `src/**/app.*`])

    expect(infoSpy).toHaveBeenCalledOnce()
    expect(successSpy).toHaveBeenCalledOnce()
  })

  it(`returns glob results from array`, async () => {
    const results = await glob([`src/**/*.tsx`, `src/**/app.*`])

    expect(results).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`scripts/index.tsx`),
        expect.stringContaining(`styles/app.css`),
        expect.stringContaining(`scripts/components/app.tsx`),
      ]),
    )
  })

  it(`returns glob results from array (sync)`, () => {
    const syncResults = globSync([`src/**/*.tsx`, `src/**/app.*`])
    expect(syncResults).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`scripts/index.tsx`),
        expect.stringContaining(`styles/app.css`),
        expect.stringContaining(`scripts/components/app.tsx`),
      ]),
    )
  })

  it(`returns glob results from variadic params`, async () => {
    const results = await glob(`src/**/*.tsx`, `src/**/app.*`)
    const syncResults = globSync(`src/**/*.tsx`, `src/**/app.*`)

    expect(results).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`scripts/index.tsx`),
        expect.stringContaining(`styles/app.css`),
        expect.stringContaining(`scripts/components/app.tsx`),
      ]),
    )
    expect(syncResults).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`scripts/index.tsx`),
        expect.stringContaining(`styles/app.css`),
        expect.stringContaining(`scripts/components/app.tsx`),
      ]),
    )
  })

  it(`returns glob results with negation`, async () => {
    const results = await glob(`!**/index.tsx`, `src/**/*.tsx`)
    const syncResults = globSync(`!**/index.tsx`, `src/**/*.tsx`)

    expect(results).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`scripts/index.tsx`),
      ]),
    )
    expect(syncResults).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`scripts/index.tsx`),
      ]),
    )
  })
})
