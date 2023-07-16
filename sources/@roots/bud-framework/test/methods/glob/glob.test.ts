import {Bud, factory} from '@repo/test-kit'
import * as source from '@roots/bud-framework/methods/glob'
import {beforeEach, describe, expect, it, vi} from 'vitest'

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

  it(`returns glob results from array`, async () => {
    const results = await glob([`src/**/*.tsx`, `src/**/app.*`])

    expect(results).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`scripts/index.tsx`),
        expect.stringContaining(`scripts/scripts.tsx`),
        expect.stringContaining(`scripts/components/app.tsx`),
        expect.stringContaining(`styles/app.css`),
      ]),
    )

    const syncResults = globSync([`src/**/*.tsx`, `src/**/app.*`])
    expect(syncResults).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`scripts/index.tsx`),
        expect.stringContaining(`scripts/scripts.tsx`),
        expect.stringContaining(`scripts/components/app.tsx`),
        expect.stringContaining(`styles/app.css`),
      ]),
    )
  })

  it(`returns glob results from variadic params`, async () => {
    const results = await glob(`src/**/*.tsx`, `src/**/app.*`)
    expect(results).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`scripts/index.tsx`),
        expect.stringContaining(`scripts/scripts.tsx`),
        expect.stringContaining(`scripts/components/app.tsx`),
        expect.stringContaining(`styles/app.css`),
      ]),
    )

    const syncResults = globSync(`src/**/*.tsx`, `src/**/app.*`)
    expect(syncResults).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`scripts/index.tsx`),
        expect.stringContaining(`scripts/scripts.tsx`),
        expect.stringContaining(`scripts/components/app.tsx`),
        expect.stringContaining(`styles/app.css`),
      ]),
    )
  })

  it(`returns glob results with negation`, async () => {
    const results = await glob(`!**/index.tsx`, `src/**/*.tsx`)

    expect(results).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`scripts/scripts.tsx`),
        expect.stringContaining(`scripts/components/app.tsx`),
      ]),
    )

    const syncResults = globSync(`!**/index.tsx`, `src/**/*.tsx`)
    expect(syncResults).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`scripts/scripts.tsx`),
        expect.stringContaining(`scripts/components/app.tsx`),
      ]),
    )
  })
})
