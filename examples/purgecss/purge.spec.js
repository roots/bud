/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('@roots/bud')
const webpack = require('webpack')

const {resolve} = require('path')
const {readFileSync} = require('fs-extra')

jest.useFakeTimers()
jest.setTimeout(10000)

bud.mode.set('production')

describe('purgecss', () => {
  bud
    .projectPath(__dirname)
    .srcPath('src')
    .distPath('dist')
    .mode.set('production')

  bud
    .extend([
      require('@roots/bud-sass'),
      require('@roots/bud-purgecss').plugin,
    ])
    .bundle('app', [bud.src('app.scss')])
    .purgecss({
      content: ['./**/*.html'],
      options: {
        whitelist: ['container'],
        whitelistPatterns: [/^d(-.*)?$/, /^mr(-.*)?$/],
      },
    })

  describe('compiles', () => {
    test('app.css', done => {
      webpack(bud.config(bud)).run((err, stat) => {
        const asset = stat.toJson({source: true}).assets[0]

        expect(asset.chunkNames[0]).toEqual('app')
        expect(asset.size).toBeLessThan(30000)

        done()
      })
    })

    test('Has markup derived classes', done => {
      webpack(bud.config(bud)).run((err, stat) => {
        const source = stat
          .toJson({source: true})
          .chunks[0].modules.pop().source

        expect(source).toContain(
          '.container{min-width:992px !important}.table{border-collapse:collapse !important}.table td,.table th{background-color:#fff !important}}.test-class{background-color:#000000}.test-class .inner-unique-class{color:#ffffff}',
        )

        done()
      })
    })
  })
})
