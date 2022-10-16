/* eslint-disable no-console */
/* eslint-disable tsdoc/syntax */
/**
 * @jest-environment jsdom
 */

import {describe, expect, it, jest} from '@jest/globals'

import client from './client'
import {injectEvents} from './events'
import * as options from './options'

// @ts-ignore
global.EventSource = class Events {
  public constructor() {}
}

window.EventSource = global.EventSource

const Events = injectEvents(global.EventSource)

const mockHot = jest.fn()
// @ts-ignore
global.module = {hot: mockHot}

describe(`@roots/bud-client`, () => {
  it(`should be a fn module`, () => {
    expect(client).toBeInstanceOf(Function)
  })

  it(`should add window.bud`, async () => {
    await client(`?name=test`)
    expect(window.bud).toBeDefined()
  })

  it(`should add window.bud.hmr as an instance of EventSource`, async () => {
    await client(`?name=test`)
    expect(window.bud.hmr[`test`]).toBeInstanceOf(EventSource)
  })

  it(`should set clientOptions`, async () => {
    await client(`?name=test`)
    const clientOptions = options.data
    expect(clientOptions.test).toEqual(
      expect.objectContaining({
        debug: true,
        indicator: true,
        log: true,
        name: `test`,
        overlay: true,
        path: `/__bud/hmr`,
        reload: true,
        timeout: 20000,
      }),
    )
  })

  it(`should call console.log`, async () => {
    const spy = jest.spyOn(global.console, `log`)

    await client(`?name=test`)
    const clientOptions = options.data
    const events = Events.make(clientOptions.test)
    events.onopen()
    expect(spy).toHaveBeenCalled()
  })

  it(`should call listener from onmessage`, async () => {
    await client(`?name=test`)
    const clientOptions = options.data
    const events = Events.make(clientOptions.test)

    const listenerMock = jest.fn(async () => null)
    events.addMessageListener(listenerMock)
    events.messages = new Set([`123`, `234`])

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
