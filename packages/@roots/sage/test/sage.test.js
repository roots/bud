const {resolve} = require('path')

/**
 * @roots/container
 */
describe('@roots/sage', function () {
  beforeEach(() => {
    this.sage = require('@roots/sage').sage

    this.sage.store.set(
      'locations.project',
      resolve(__dirname, './theme'),
      ``,
    )

    this.sage.store.set('options.ci', true)
  })

  describe('entrypoints', () => {
    it('should be set using sage.entry', () => {
      const assertProps = {
        app: ['{scripts,styles}/app.{js,css}'],
        editor: ['{scripts,styles}/editor.{js,css}'],
        customizer: ['scripts/customizer.js'],
      }

      const expectConfig = {
        app: ['scripts/app.js', 'styles/app.css'],
        editor: ['scripts/editor.js', 'styles/editor.css'],
        customizer: ['scripts/customizer.js'],
      }

      this.sage.entry(assertProps)

      expect(this.sage.build.make().entry).toEqual(expectConfig)
    })
  })
})
