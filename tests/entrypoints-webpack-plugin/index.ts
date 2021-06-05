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

    entrypoints.addToManifest({
      entry: 'app',
      file: 'runtime.js',
      info: {contenthash: '', hash: ''},
    })
    entrypoints.addToManifest({
      entry: 'app',
      file: 'app.js',
      info: {contenthash: '', hash: ''},
    })
    entrypoints.addToManifest({
      entry: 'app',
      file: 'app.css',
      info: {contenthash: '', hash: ''},
    })
    entrypoints.addToManifest({
      entry: 'app',
      file: 'vendor/foobar.js',
      info: {contenthash: '', hash: ''},
    })

    expect(entrypoints.assets).toEqual({
      app: {
        js: {
          'runtime.js': 'runtime.js',
          'app.js': 'app.js',
          'vendor/foobar.js': 'vendor/foobar.js',
        },
        css: {
          'app.css': 'app.css',
        },
      },
    })
  })
})

export {}
