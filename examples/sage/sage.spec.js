/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('@roots/bud')
const webpack = require('webpack')

const {resolve} = require('path')
const {readJsonSync} = require('fs-extra')

jest.useFakeTimers()

describe('sage', () => {
  bud.extend([
    require('@roots/bud-sass'),
    require('@roots/bud-eslint').plugin,
    require('@roots/bud-stylelint').plugin,
    require('@roots/bud-purgecss').plugin,
    require('@roots/bud-wordpress-manifests'),
  ])

  bud
    .projectPath(__dirname)
    .distPath('dist')
    .srcPath('resources/assets')
    .publicPath('app/themes/sage/dist')

  bud
    .bundle('app', [
      bud.src('scripts/app.js'),
      bud.src('styles/app.scss'),
    ])
    .bundle('editor', [
      bud.src('scripts/editor.js'),
      bud.src('styles/editor.scss'),
    ])
    .bundle('customizer', [bud.src('scripts/customizer.js')])

  bud
    .provide({jquery: ['$', 'jQuery']})
    .vendor()
    .runtimeManifest()

  bud.when(bud.inDevelopment, () => {
    bud
      .dev({
        from: {
          host: bud.env.get('APP_HOST'),
        },
      })
      .devtool('inline-cheap-module-source-map')
  })

  bud.when(bud.inProduction, () => {
    bud
      .devtool('hidden-source-map')
      .mini()
      .purgecss(require('@roots/bud-purgecss').preset)
  })

  config = bud.config(bud)
  build = webpack(config)

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
  })

  describe('compiles', () => {
    test('app.js', done => {
      build.run((err, stat) => {
        expect(stat.toJson().assets[0]).toEqual({
          chunkNames: ['app'],
          chunks: [5],
          emitted: true,
          info: {},
          isOverSizeLimit: undefined,
          name: 'app.js',
          size: 2772,
        })
        done()
      })
    })

    test('app.js.map', done => {
      build.run((err, stat) => {
        expect(stat.toJson().assets[1]).toEqual({
          chunkNames: ['app'],
          chunks: [5],
          emitted: true,
          info: {development: true},
          isOverSizeLimit: undefined,
          name: 'app.js.map',
          size: 1594,
        })
        done()
      })
    })

    test('customizer.js', done => {
      build.run((err, stat) => {
        expect(stat.toJson().assets[2]).toEqual({
          chunkNames: ['customizer'],
          chunks: [7],
          emitted: true,
          info: {},
          isOverSizeLimit: undefined,
          name: 'customizer.js',
          size: 813,
        })
        done()
      })
    })

    test('customizer.js.map', done => {
      build.run((err, stat) => {
        expect(stat.toJson().assets[3]).toEqual({
          chunkNames: ['customizer'],
          chunks: [7],
          emitted: true,
          info: {development: true},
          isOverSizeLimit: undefined,
          name: 'customizer.js.map',
          size: 756,
        })
        done()
      })
    })

    test('editor.js', done => {
      build.run((err, stat) => {
        expect(stat.toJson().assets[4]).toEqual({
          chunkNames: ['editor'],
          chunks: [6],
          emitted: true,
          info: {},
          isOverSizeLimit: undefined,
          name: 'editor.js',
          size: 10278,
        })
        done()
      })
    })

    test('editor.js.map', done => {
      build.run((err, stat) => {
        expect(stat.toJson().assets[5]).toEqual({
          chunkNames: ['editor'],
          chunks: [6],
          emitted: true,
          info: {development: true},
          isOverSizeLimit: undefined,
          name: 'editor.js.map',
          size: 10638,
        })
        done()
      })
    })

    test('entrypoints.json', done => {
      build.run((err, stat) => {
        expect(stat.toJson().assets[6]).toEqual({
          chunkNames: [],
          chunks: [],
          emitted: true,
          info: {},
          sizeLimit: undefined,
          name: 'entrypoints.json',
          size: 542,
        })
        done()
      })
    })
  })

  describe('makes a manifest', () => {
    test('includes the app entrypoint', () => {
      const manifest = readJsonSync(
        resolve(__dirname, 'dist/manifest.json'),
      )
      expect(manifest['app.js']).toBe(
        '/app/themes/sage/dist/app.js',
      )
    })
  })
})
