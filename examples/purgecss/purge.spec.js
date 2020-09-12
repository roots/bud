/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('@roots/bud')
const webpack = require('webpack')

jest.useFakeTimers()
jest.setTimeout(10000)

describe('purgecss', () => {
  describe('compiles', () => {
    beforeEach(() => {
      bud.mode.set('production').projectPath(__dirname).srcPath('src').distPath('dist')
      bud
        .extend([
          require('@roots/bud-sass'),
          require('@roots/bud-purgecss').plugin,
        ])
        .bundle('app', [bud.src('app.scss')])
        .purgecss({
          content: ['./**/*.html'],
          options: {
            whitelist: ['whitelisted'],
          },
        })
    })

    test('app.css', done => {
      webpack(bud.config(bud)).run((err, stat) => {
        const asset = stat.toJson({source: true}).assets[0]

        expect(asset.chunkNames[0]).toEqual('app')
        expect(asset.size).toBeLessThan(30000)

        done()
      })
    })
  })
})
