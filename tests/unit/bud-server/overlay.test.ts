/* eslint-disable tsdoc/syntax */
/**
 * @jest-environment jsdom
 */

import * as Overlay from '@roots/bud-server/client/indicator'

describe('@roots/bud-server', function () {
  describe('overlay', () => {
    it('has a make fn', () => {
      expect(Overlay.make).toBeInstanceOf(Function)
    })

    test.todo('returns a promise')

    test.todo('make fn return resolves to Controller')
  })
})
