import {beforeEach, describe, expect, it, jest} from '@jest/globals'
import {factory} from '@repo/test-kit/bud'
import {Service} from '@roots/bud-framework/service'

import Dashboard from './index.js'

describe(`Dashboard`, () => {
  let bud
  let dashboard

  beforeEach(async () => {
    bud = await factory()
    bud.context.args.log = true
    dashboard = new Dashboard(bud)
  })

  it(`should be a Service`, async () => {
    expect(dashboard).toBeInstanceOf(Service)
  })

  it(`should have a stats fn`, async () => {
    expect(dashboard.stats).toBeInstanceOf(Function)
  })

  it(`should have a getLastHash fn that returns the value of dashboard.lastHash`, async () => {
    dashboard.lastHash = `test`
    expect(dashboard.getLastHash()).toBe(`test`)
  })
  it(`should have a setLastHash fn that set the value of dashboard.lastHash`, async () => {
    dashboard.setLastHash(`test`)
    expect(dashboard.lastHash).toBe(`test`)
  })
  it(`should have a hashIsStale fn that returns true if hash is equal to lastHash`, async () => {
    dashboard.lastHash = `test`
    expect(dashboard.hashIsStale(`test`)).toBeTruthy()
  })

  it(`should return early from dashboard.stats when there are no stats provided`, async () => {
    await dashboard.stats(
      // @ts-ignore
      undefined,
    )
    expect(dashboard.lastHash).toBeUndefined()
  })

  it(`should call setLastHash when hash is fresh`, async () => {
    const spy = jest.spyOn(dashboard, `setLastHash`)

    try {
      await dashboard.stats({hash: `test`})
    } catch (error) {}

    expect(spy).toHaveBeenCalledWith(`test`)
  })

  it(`should not call setLastHash when hash is stale`, async () => {
    const spy = jest.spyOn(dashboard, `setLastHash`)

    try {
      await dashboard.stats({hash: `test`})
    } catch (e) {}

    try {
      await dashboard.stats({hash: `test`})
    } catch (error) {}

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
