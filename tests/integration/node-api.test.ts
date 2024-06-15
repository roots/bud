import setup from '@repo/test-kit/setup'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`examples/node-api`, () => {
  describe(`when using the node api directly`, async () => {
    let test = setup({
      buildCommand: [`node`, [`node-script.js`]],
      dist: `dist/build-a`,
      integrationBuildCommand: [`node`, [`node-script.js`]],
      label: `@examples/node-api`,
    })

    beforeAll(async () => {
      await test.install()
      await test.build()
    })

    it(`should emit manifest.json`, async () => {
      expect(test.manifest).toMatchSnapshot()
    })

    it(`should emit entrypoints.json`, async () => {
      expect(test.entrypoints).toMatchSnapshot()
    })

    it(`should emit runtime.js`, async () => {
      expect(test.getAsset(`runtime.js`)).toMatchSnapshot()
    })

    it(`should emit main.js`, async () => {
      expect(test.getAsset(`main.js`)).toMatchSnapshot()
    })
  })

  describe(`when using the webpack cli`, async () => {
    let test = setup({
      buildCommand: [`yarn`, [`webpack`, `build`]],
      dist: `dist/build-b`,
      integrationBuildCommand: [`npx`, [`webpack`, `build`]],
      label: `@examples/node-api`,
    })

    beforeAll(async () => {
      await test.install()
      await test.build()
    })

    it(`should emit manifest.json`, async () => {
      expect(test.manifest).toMatchSnapshot()
    })

    it(`should emit entrypoints.json`, async () => {
      expect(test.entrypoints).toMatchSnapshot()
    })

    it(`should emit runtime.js`, async () => {
      expect(test.getAsset(`runtime.js`)).toMatchSnapshot()
    })

    it(`should emit main.js`, async () => {
      expect(test.getAsset(`main.js`)).toMatchSnapshot()
    })
  })
})
