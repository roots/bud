import {EntrypointsWebpackPlugin} from '@roots/entrypoints-webpack-plugin'
import {Chunk} from 'webpack'

describe('entrypoints.json', () => {
  it('should get chunk file list', () => {
    const entrypoints = new EntrypointsWebpackPlugin({
      publicPath: '/public/',
    })
    const chonk = new Chunk()
    chonk.files = new Set(['foo.js', 'bar.js'])
    const files = entrypoints.getEntrypointFiles({
      chunks: [chonk],
      origins: [],
    })

    expect(files).toEqual(['foo.js', 'bar.js'])
  })

  it('should create manifest object', () => {
    const entrypoints = new EntrypointsWebpackPlugin({
      publicPath: '/public/',
    })

    entrypoints.assets = {}

    entrypoints.addToManifest({
      entry: 'app',
      file: 'runtime.js',
    })
    entrypoints.addToManifest({
      entry: 'app',
      file: 'app.js',
    })
    entrypoints.addToManifest({
      entry: 'app',
      file: 'app.css',
    })
    entrypoints.addToManifest({
      entry: 'app',
      file: 'vendor/foobar.js',
    })

    expect(entrypoints.assets).toEqual({
      app: {
        js: [
          '/public/runtime.js',
          '/public/app.js',
          '/public/vendor/foobar.js',
        ],
        css: ['/public/app.css'],
      },
    })
  })
})

export {}
