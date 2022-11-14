import '../../types.js'

import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it} from 'vitest'

import {bundle} from './index.js'

describe(`bud.bundle`, () => {
  let bud
  let instance: typeof bundle

  beforeEach(async () => {
    bud = await factory()
    instance = bundle.bind(bud)
  })

  it(`should set the bundle using a string`, async () => {
    await instance(`react`).api.processQueue()

    expect(
      bud.hooks.filter(`build.optimization.splitChunks`),
    ).toMatchSnapshot()
  })

  it(`should set the bundle using a string name and a string test`, async () => {
    await instance(`react`, `react`).api.processQueue()

    expect(
      bud.hooks.filter(`build.optimization.splitChunks`),
    ).toMatchSnapshot()
  })

  it(`should set the bundle using a string name and regular expression test`, async () => {
    await instance(`react`, /react/).api.processQueue()

    expect(
      bud.hooks.filter(`build.optimization.splitChunks`),
    ).toMatchSnapshot()
  })

  it(`should set the bundle using a string name and array of strings test`, async () => {
    await instance(`react`, [`react`, `react-dom`]).api.processQueue()

    expect(
      bud.hooks.filter(`build.optimization.splitChunks`),
    ).toMatchSnapshot()
  })

  describe(`when hashing is enabled`, () => {
    it(`should include the hash in the \`filename\` property`, async () => {
      await instance(`react`, [`react`, `react-dom`])
        .hash()
        .api.processQueue()

      expect(
        bud.hooks.filter(`build.optimization.splitChunks`).cacheGroups
          .react.filename,
      ).toMatchSnapshot(`js/bundle/react/[name].[contenthash].js`)
    })
  })
})
