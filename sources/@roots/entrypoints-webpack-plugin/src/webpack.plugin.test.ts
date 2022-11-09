import {describe, expect, it} from 'vitest'
import Webpack from 'webpack'

import {EntrypointsWebpackPlugin} from './index.js'

describe(`entrypoints.json`, () => {
  it(`should get chunk file list`, () => {
    const entrypoints = new EntrypointsWebpackPlugin({
      publicPath: `/public/`,
    })
    const chonk = new Webpack.Chunk()
    chonk.files = new Set([`foo.js`, `bar.js`])
    const files = entrypoints
      .getEntrypointFiles({
        chunks: [chonk],
      })
      .map(file => file.file)

    expect(files.shift()).toMatchSnapshot(`foo.js`)
    expect(files.shift()).toMatchSnapshot(`bar.js`)
  })

  it(`should create manifest object`, () => {
    const entrypoints = new EntrypointsWebpackPlugin({
      publicPath: `/public/`,
    })

    entrypoints.assets = {}

    entrypoints.addToManifest({
      entry: `app`,
      file: `runtime.js`,
    })
    entrypoints.addToManifest({
      entry: `app`,
      file: `app.js`,
    })
    entrypoints.addToManifest({
      entry: `app`,
      file: `app.css`,
    })
    entrypoints.addToManifest({
      entry: `app`,
      file: `vendor/foobar.js`,
    })

    expect(entrypoints.assets).toEqual({
      app: {
        js: [
          `/public/runtime.js`,
          `/public/app.js`,
          `/public/vendor/foobar.js`,
        ],
        css: [`/public/app.css`],
      },
    })
  })

  it(`should create manifest object with keyed file list`, () => {
    const entrypoints = new EntrypointsWebpackPlugin({
      publicPath: `/public/`,
      type: `object`,
    })

    entrypoints.assets = {}

    entrypoints.addToManifest({
      key: `runtime`,
      entry: `app`,
      file: `runtime.js`,
    })
    entrypoints.addToManifest({
      key: `app`,
      entry: `app`,
      file: `app.js`,
    })
    entrypoints.addToManifest({
      key: `app`,
      entry: `app`,
      file: `app.css`,
    })
    entrypoints.addToManifest({
      key: `vendor/foobar`,
      entry: `app`,
      file: `vendor/foobar.js`,
    })

    expect(entrypoints.assets).toEqual({
      app: {
        js: {
          runtime: `/public/runtime.js`,
          app: `/public/app.js`,
          'vendor/foobar': `/public/vendor/foobar.js`,
        },
        css: {app: `/public/app.css`},
      },
    })
  })
})
