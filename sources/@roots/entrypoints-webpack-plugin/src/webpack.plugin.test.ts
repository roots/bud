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
      .getChunkedFiles([chonk])
      // @ts-ignore
      .map(file => file.file)

    expect(files.shift()).toMatchSnapshot(`foo.js`)
    expect(files.shift()).toMatchSnapshot(`bar.js`)
  })

  it(`should create manifest object`, () => {
    const entrypoints = new EntrypointsWebpackPlugin({
      publicPath: `/public/`,
    })

    entrypoints.addToManifest({
      ident: `runtime`,
      path: `foo.js`,
      type: `js`,
    })

    expect(entrypoints.entrypoints.get(`runtime`)?.get(`js`)).toEqual(
      new Set([`foo.js`]),
    )
  })
})
