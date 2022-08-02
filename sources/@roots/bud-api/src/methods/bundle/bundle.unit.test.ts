import {beforeEach, describe, expect, it} from '@jest/globals'
import {Bud, factory} from '@repo/test-kit/bud'

import {bundle} from './bundle.method.js'

describe('bud.bundle', () => {
  let bud: Bud
  let instance: typeof bundle

  beforeEach(async () => {
    bud = await factory()
    instance = bundle.bind(bud)
  })

  it('should set the bundle using a string', async () => {
    await instance('react').api.processQueue()

    expect(
      bud.hooks.filter('build.optimization.splitChunks'),
    ).toMatchSnapshot()
  })

  it('should set the bundle using a regular expression', async () => {
    await instance('react', /react/).api.processQueue()

    expect(
      bud.hooks.filter('build.optimization.splitChunks'),
    ).toMatchSnapshot()
  })

  it('should set the bundle using an array of strings', async () => {
    await instance('react', ['react', 'react-dom']).api.processQueue()

    expect(
      bud.hooks.filter('build.optimization.splitChunks'),
    ).toMatchSnapshot()
  })

  describe('when hashing is enabled', () => {
    it('should include the hash in the `filename` property', async () => {
      await instance('react', ['react', 'react-dom'])
        .hash()
        .api.processQueue()

      expect(
        bud.hooks.filter('build.optimization.splitChunks').cacheGroups
          .react.filename,
      ).toMatchSnapshot('js/bundle/react/[name].[contenthash].js')
    })
  })
})
