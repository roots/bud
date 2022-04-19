import * as client from '@roots/sage/src/client'
import domReady from '@roots/sage/src/client/domReady'

describe('@roots/sage', () => {
  test('client', () => {
    expect(client).toMatchSnapshot()
  })

  test('domReady export', () => {
    expect(client.domReady).toBe(domReady)
  })
})
