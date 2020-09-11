/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('@roots/bud')
const webpack = require('webpack')

const {resolve} = require('path')
const {readJsonSync} = require('fs-extra')

jest.useFakeTimers()

bud.mode == 'production'
bud.options.set('webpack.mode', 'production')

describe('sage', () => {
  bud
    .extend([
      require('@roots/bud-sass'),
      require('@roots/bud-react'),
      require('@roots/bud-eslint').plugin,
      require('@roots/bud-stylelint').plugin,
      require('@roots/bud-purgecss').plugin,
      require('@roots/bud-wordpress-manifests'),
    ])
    .projectPath(__dirname)
    .distPath('dist')
    .srcPath('resources/assets')
    .publicPath('app/themes/sage/dist')
    .bundle('app', [
      bud.src('scripts/app.js'),
      bud.src('styles/app.scss'),
    ])
    .bundle('editor', [
      bud.src('scripts/editor.js'),
      bud.src('styles/editor.scss'),
    ])
    .bundle('customizer', [bud.src('scripts/customizer.js')])
    .provide({jquery: ['$', 'jQuery']})
    .vendor()
    .runtimeManifest()
    .devtool('hidden-source-map')
    .mini()
    .purgecss(require('@roots/bud-purgecss').preset)

  config = bud.config(bud)
  build = webpack(config)

  describe('build base is configured', () => {
    test('babel presets as expected', () => {
      expect(bud.options.get('babel.presets')[0][0]).toContain('@babel/preset-env')
      expect(bud.options.get('babel.presets')[1]).toContain('@babel/preset-react')
    })
  })

  describe('has a functioning options store', () => {
    test('store has app js', () => {
      expect(bud.options.get('webpack.entry.app')[0]).toBe(
        resolve(__dirname, 'resources/assets/scripts/app.js'),
      )
    })

    test('store has app scss', () => {
      expect(bud.options.get('webpack.entry.app')[1]).toBe(
        resolve(__dirname, 'resources/assets/styles/app.scss'),
      )
    })

    test('store has editor js', () => {
      expect(bud.options.get('webpack.entry.editor')[0]).toBe(
        resolve(__dirname, 'resources/assets/scripts/editor.js'),
      )
    })

    test('store has editor scss', () => {
      expect(bud.options.get('webpack.entry.editor')[1]).toBe(
        resolve(
          __dirname,
          'resources/assets/styles/editor.scss',
        ),
      )
    })

    test('store has customizer js', () => {
      expect(
        bud.options.get('webpack.entry.customizer')[0],
      ).toBe(
        resolve(
          __dirname,
          'resources/assets/scripts/customizer.js',
        ),
      )
    })
  })

  describe('generates valid config', () => {
    test('compiler has app js entrypoint', () => {
      expect(config.entry.app[0]).toBe(
        resolve(__dirname, 'resources/assets/scripts/app.js'),
      )
    })

    test('compiler has editor js entrypoint', () => {
      expect(config.entry.editor[0]).toBe(
        resolve(__dirname, 'resources/assets/scripts/editor.js'),
      )
    })

    test('compiler has customizer js entrypoint', () => {
      expect(config.entry.customizer[0]).toBe(
        resolve(__dirname, 'resources/assets/scripts/customizer.js'),
      )
    })
  })

  describe('compiles', () => {
    test('app.js', done => {
      build.run((err, stat) => {
        const asset = stat.toJson().assets[0]

        expect(asset.chunkNames[0]).toEqual('app')
        expect(asset.chunks[0]).toEqual(5)
        expect(asset.emitted).toEqual(true)

        done()
      })
    })

    test('app.js.map', done => {
      build.run((err, stat) => {
        const asset = stat.toJson().assets[1]

        expect(asset.chunkNames[0]).toEqual('app')
        expect(asset.chunks[0]).toEqual(5)
        expect(asset.emitted).toEqual(true)
        expect(asset.info.development).toEqual(true)

        done()
      })
    })

    test('customizer.js', done => {
      build.run((err, stat) => {
        const asset = stat.toJson().assets[2]

        expect(asset.chunkNames[0]).toEqual('customizer')
        expect(asset.chunks[0]).toEqual(7)
        expect(asset.emitted).toEqual(true)

        done()
      })
    })

    test('customizer.js.map', done => {
      build.run((err, stat) => {
        const asset = stat.toJson().assets[3]

        expect(asset.chunkNames[0]).toEqual('customizer')
        expect(asset.chunks[0]).toEqual(7)
        expect(asset.emitted).toEqual(true)
        expect(asset.info.development).toEqual(true)

        done()
      })
    })

    test('editor.js', done => {
      build.run((err, stat) => {
        const asset = stat.toJson().assets[4]

        expect(asset.chunkNames[0]).toEqual('editor')
        expect(asset.chunks[0]).toEqual(6)
        expect(asset.emitted).toEqual(true)

        done()
      })
    })

    test('editor.js.map', done => {
      build.run((err, stat) => {
        const asset = stat.toJson().assets[5]

        expect(asset.chunkNames[0]).toEqual('editor')
        expect(asset.chunks[0]).toEqual(6)
        expect(asset.emitted).toEqual(true)
        expect(asset.info.development).toEqual(true)

        done()
      })
    })

    test('entrypoints.json', done => {
      build.run((err, stat) => {
        const asset = stat.toJson().assets[6]

        expect(asset.chunkNames).toEqual([])
        expect(asset.chunks).toEqual([])
        expect(asset.emitted).toEqual(true)
        expect(asset.name).toBe('entrypoints.json')

        done()
      })
    })
  })

  describe('makes a manifest', () => {
    test('includes the app entrypoint', () => {
      const manifest = readJsonSync(
        resolve(__dirname, 'dist/manifest.json'),
      )
      expect(manifest['app.js']).toMatch(
        /\/app\/themes\/sage\/dist\/app.\.*/,
      )
    })

    test('includes the editor entrypoint', () => {
      const manifest = readJsonSync(
        resolve(__dirname, 'dist/manifest.json'),
      )
      expect(manifest['editor.js']).toMatch(
        /\/app\/themes\/sage\/dist\/editor.\.*/,
      )
    })

    test('includes the customizer entrypoint', () => {
      const manifest = readJsonSync(
        resolve(__dirname, 'dist/manifest.json'),
      )
      expect(manifest['customizer.js']).toMatch(
        /\/app\/themes\/sage\/dist\/customizer.\.*/,
      )
    })
  })
})
