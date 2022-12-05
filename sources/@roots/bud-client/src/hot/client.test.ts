/* eslint-disable no-console */
/**
 * @vitest-environment jsdom
 */
import {describe, expect, it, vi} from 'vitest'

import {client} from './client.js'
import {injectEvents} from './events.js'
import * as options from './options.js'

// @ts-ignore
global.EventSource = class Events {
  public constructor() {}
}

window.EventSource = global.EventSource

const Events = injectEvents(global.EventSource)

// @ts-ignore
const webpackHotMock = {
  hot: vi.fn(),
  status: vi.fn(),
} as __WebpackModuleApi.Hot

describe(`@roots/bud-client`, () => {
  it(`should be a fn module`, () => {
    expect(client).toBeInstanceOf(Function)
  })

  it(`should add window.bud`, async () => {
    await client(`?name=test`, webpackHotMock)
    expect(window.bud).toBeDefined()
  })

  it(`should add window.bud.hmr as an instance of EventSource`, async () => {
    await client(`?name=test`, webpackHotMock)
    expect(window.bud?.hmr?.test).toBeInstanceOf(EventSource)
  })

  it(`should set clientOptions`, async () => {
    await client(`?name=test`, webpackHotMock)
    expect(options.data).toEqual(
      expect.objectContaining({
        debug: true,
        indicator: true,
        log: true,
        name: `@roots/bud-client`,
        overlay: true,
        path: `/bud/hot`,
        reload: true,
        timeout: 2000,
      }),
    )
  })

  it(`should call listener from onmessage`, async () => {
    await client(`?name=test`, webpackHotMock)
    const events = Events.make(options.data)

    const listenerMock = vi.fn(async () => {})
    events.addListener(listenerMock)

    await events.onmessage(
      // @ts-ignore
      {
        data: `{
        "data": {
          "hash": "test",
          "action": "update"
        }
      }`,
      },
    )

    expect(listenerMock).toHaveBeenCalled()
  })
})
