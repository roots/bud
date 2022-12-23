import {Bud, factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import * as source from './glob.js'

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
    const results = await glob(`@src/**/*.js`)
    const syncResults = globSync(`@src/**/*.js`)

    expect(results).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`scripts/app.js`),
        expect.stringContaining(`scripts/components/main.js`),
      ]),
    )

    expect(syncResults).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`scripts/app.js`),
        expect.stringContaining(`scripts/components/main.js`),
      ]),
    )
  })

  it(`calls bud.success and bud.info`, async () => {
    const infoSpy = vi.spyOn(bud, `info`)
    const successSpy = vi.spyOn(bud, `success`)

    await glob([`src/**/*.js`, `src/**/app.*`])

    expect(infoSpy).toHaveBeenCalledOnce()
    expect(successSpy).toHaveBeenCalledOnce()
  })

  it(`returns glob results from array`, async () => {
    const results = await glob([`src/**/*.js`, `src/**/app.*`])

    expect(results).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`scripts/app.js`),
        expect.stringContaining(`styles/app.css`),
        expect.stringContaining(`scripts/components/main.js`),
      ]),
    )
  })

  it(`returns glob results from array (sync)`, () => {
    const syncResults = globSync([`src/**/*.js`, `src/**/app.*`])
    expect(syncResults).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`scripts/app.js`),
        expect.stringContaining(`styles/app.css`),
        expect.stringContaining(`scripts/components/main.js`),
      ]),
    )
  })

  it(`returns glob results from variadic params`, async () => {
    const results = await glob(`src/**/*.js`, `src/**/app.*`)
    const syncResults = globSync(`src/**/*.js`, `src/**/app.*`)

    expect(results).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`scripts/app.js`),
        expect.stringContaining(`styles/app.css`),
        expect.stringContaining(`scripts/components/main.js`),
      ]),
    )
    expect(syncResults).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`scripts/app.js`),
        expect.stringContaining(`styles/app.css`),
        expect.stringContaining(`scripts/components/main.js`),
      ]),
    )
  })

  it(`returns glob results with negation`, async () => {
    const results = await glob(`!**/main.js`, `src/**/*.js`)
    const syncResults = globSync(`!**/main.js`, `src/**/*.js`)

    expect(results).toEqual(
      expect.arrayContaining([expect.stringContaining(`scripts/app.js`)]),
    )
    expect(syncResults).toEqual(
      expect.arrayContaining([expect.stringContaining(`scripts/app.js`)]),
    )
  })
})
