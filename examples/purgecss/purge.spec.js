/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('@roots/bud')
const webpack = require('webpack')
const {resolve} = require('path')
const {readFileSync} = require('fs-extra')

jest.useFakeTimers()

describe('purgecss', () => {
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
        const asset = stat.toJson().assets[0]

        expect(asset.chunkNames[0]).toEqual('app')
        expect(asset.size).toBeLessThan(5000)

        done()
      })
    })

    test('has markup derived classes', done => {
      expect(
        readFileSync(resolve(__dirname, 'dist/app.css'), 'utf8'),
      ).toContain(
        '.test-class{background-color:#000000}.test-class .inner-unique-class{color:#ffffff}',
      )

      done()
    })
  })
})
