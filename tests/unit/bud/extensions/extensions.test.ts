import * as extensions from '@roots/bud/src/extensions'

describe('@roots/bud', () => {
  describe('extensions', () => {
    it('is a function`', () => {
      expect(extensions.extensions).toBeInstanceOf(Function)
    })

    it('returns object', () => {
      expect(extensions.extensions()).toMatchSnapshot()
    })
  })
})
