import {Plugin} from '@roots/entrypoints-webpack-plugin'
import {Chunk} from 'webpack'

describe('entrypoints.json', () => {
  it('should get chunk file list', () => {
    const entrypoints = new Plugin()
    const chonk = new Chunk()
    chonk.files = new Set(['foo.js', 'bar.js'])
    const files = entrypoints.getEntrypointFiles({
      chunks: [chonk],
      origins: [],
    })

    expect(files).toEqual(['foo.js', 'bar.js'])
  })

  it('should create manifest object', () => {
    const entrypoints = new Plugin()

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
        js: {
          runtime: 'runtime.js',
          app: 'app.js',
          'vendor/foobar': 'vendor/foobar.js',
        },
        css: {
          app: 'app.css',
        },
      },
    })
  })
})

export {}
