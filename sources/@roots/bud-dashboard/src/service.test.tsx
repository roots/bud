import {beforeEach, describe, expect, it, jest} from '@jest/globals'
import {factory} from '@repo/test-kit/bud'
import {Service} from '@roots/bud-framework/service'

import Dashboard from './index.js'

describe(`Dashboard`, () => {
  let bud

  beforeEach(async () => {
    bud = await factory()
  })

  it(`should be a Service`, async () => {
    const dashboard = new Dashboard(bud)
    expect(dashboard).toBeInstanceOf(Service)
  })

  it(`should have a stats fn`, async () => {
    const dashboard = new Dashboard(bud)
    expect(dashboard.stats).toBeInstanceOf(Function)
  })

  it(`should have a getLastHash fn that returns the value of dashboard.lastHash`, async () => {
    const dashboard = new Dashboard(bud)
    dashboard.lastHash = `test`
    expect(dashboard.getLastHash()).toBe(`test`)
  })
  it(`should have a setLastHash fn that set the value of dashboard.lastHash`, async () => {
    const dashboard = new Dashboard(bud)
    dashboard.setLastHash(`test`)
    expect(dashboard.lastHash).toBe(`test`)
  })
  it(`should have a hashIsStale fn that returns true if hash is equal to lastHash`, async () => {
    const dashboard = new Dashboard(bud)
    dashboard.lastHash = `test`
    expect(dashboard.hashIsStale(`test`)).toBeTruthy()
  })

  it(`should return early from dashboard.stats when there are no stats provided`, async () => {
    const dashboard = new Dashboard(bud)
    await dashboard.stats(
      // @ts-ignore
      undefined,
    )
    expect(dashboard.lastHash).toBeUndefined()
  })

  it(`should set lastHash when stats is called`, async () => {
    const dashboard = new Dashboard(bud)
    await dashboard.stats({hash: `test`})
    expect(dashboard.lastHash).toBe(`test`)
  })

  it(`should call setLastHash when hash is fresh`, async () => {
    const dashboard = new Dashboard(bud)
    const spy = jest.spyOn(dashboard, `setLastHash`)
    await dashboard.stats({hash: `test`})
    expect(spy).toHaveBeenCalledWith(`test`)
  })

  it(`should not call setLastHash when hash is stale`, async () => {
    const dashboard = new Dashboard(bud)
    const spy = jest.spyOn(dashboard, `setLastHash`)
    await dashboard.stats({hash: `test`})
    await dashboard.stats({hash: `test`})
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
