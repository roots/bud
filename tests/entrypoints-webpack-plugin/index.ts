const {Plugin} = require('@roots/entrypoints-webpack-plugin')

describe('entrypoints.json', () => {
  it('should get chunk file list', () => {
    const entrypoints = new Plugin()
    const files = entrypoints.getEntrypointFiles({
      chunks: [
        {
          files: ['foo.js', 'bar.js'],
        },
      ],
    })
    expect(files).toEqual(['foo.js', 'bar.js'])
  })

  it('should create manifest object', () => {
    const entrypoints = new Plugin()

    entrypoints.assets = {}

    entrypoints.addToManifest('app', 'runtime.js')
    entrypoints.addToManifest('app', 'app.js')
    entrypoints.addToManifest('app', 'app.css')
    entrypoints.addToManifest('app', 'vendor/foobar.js')

    expect(entrypoints.assets).toEqual({
      app: {
        js: ['runtime.js', 'app.js', 'vendor/foobar.js'],
        css: ['app.css'],
      },
    })
  })
})

export {}
