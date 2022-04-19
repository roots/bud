/* eslint-disable tsdoc/syntax */
/**
 * @jest-environment jsdom
 */

import * as Indicator from '@roots/bud-server/src/client/indicator'

describe('@roots/bud-server', function () {
  it('has a make fn', () => {
    expect(Indicator.make).toBeInstanceOf(Function)
  })

  test.todo('returns a promise')

  test.todo('make fn return resolves to Controller')
})
