import {Bud, factory} from '@repo/test-kit/bud'
import CleanWebpackPlugin from '@roots/bud/extensions/clean-webpack-plugin'

describe('@roots/bud', () => {
  describe('extensions', () => {
    describe('CleanWebpackPlugin', () => {
      let bud: Bud
      let impl: CleanWebpackPlugin
      beforeAll(async () => {
        bud = await factory()
        impl = new CleanWebpackPlugin(bud)
      })
      it('is named `clean-plugin`', () => {
        expect(impl.label).toBe('clean-webpack-plugin')
      })

      it('has a function named Plugin', () => {
        expect(impl.plugin).toBeInstanceOf(Function)
      })

      it('has a function named when', () => {
        expect(impl.when).toBeInstanceOf(Function)
      })
    })
  })
})
