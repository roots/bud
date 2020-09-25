/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('@roots/bud')
const webpack = require('webpack')

const {resolve} = require('path')
const {readJsonSync} = require('fs-extra')

jest.useFakeTimers()

beforeEach(() => {
  bud.srcPath('src').distPath('dist').mode.set('production')

  bud.bundle('app', [bud.src('app.js')])
})

test('store has entrypoint', () => {
  expect(bud.options.get('webpack.entry.app')[0]).toBe(
    resolve('src/app.js'),
  )
})

test('compiler has entrypoint', () => {
  expect(bud.config(bud).entry.app[0]).toBe(
    resolve('src/app.js'),
  )
})

test('compiles', () => {
  webpack(bud.config(bud)).run(stats => {
    const manifest = readJsonSync('./dist/manifest.json')

    expect(manifest['app.js']).toBe('/app.js')
  })
})
