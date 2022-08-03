import {beforeEach, describe, expect, it} from '@jest/globals'
import {Bud, factory} from '@repo/test-kit/bud'

import {method, Serve} from './serve.method.js'

describe('bud.serve', function () {
  let bud: Bud
  let serve: Serve

  beforeAll(async () => {
    bud = await factory({mode: 'development'})
    serve = method.bind(bud)
  })

  beforeEach(async () => {
    await serve('http://localhost:3000')
  })

  it('sets URL from string', async () => {
    await serve('http://example.com')
    expect(bud.hooks.filter('dev.url').hostname).toBe('example.com')
  })

  it('sets URL from number', async () => {
    const port = 6969
    await serve(port)
    expect(bud.hooks.filter('dev.url').port).toBe(port.toString())
  })

  it('sets URL from URL', async () => {
    await serve(new URL('http://example.org:9696'))
    expect(bud.hooks.filter('dev.url').origin).toBe(
      'http://example.org:9696',
    )
  })

  it('sets options', async () => {
    const options = {cert: 'foo', key: 'bar'}
    await serve({options})
    expect(bud.hooks.filter('dev.options')).toStrictEqual(options)
  })
})
