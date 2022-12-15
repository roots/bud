import {factory} from '@repo/test-kit/bud'
import {Service} from '@roots/bud-framework/service'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import Dashboard from './index.js'

describe(`Dashboard`, () => {
  let bud
  let dashboard

  beforeEach(async () => {
    bud = await factory()
    bud.context.args.log = true
    dashboard = new Dashboard(() => bud)
  })

  it(`should be a Service`, async () => {
    expect(dashboard).toBeInstanceOf(Service)
  })

  it(`should have a stats fn`, async () => {
    expect(dashboard.stats).toBeInstanceOf(Function)
  })

  it(`should return early from dashboard.stats when there are no stats provided`, async () => {
    try {
      await dashboard.stats(
        // @ts-ignore
        undefined,
      )
    } catch (e) {}
    expect(dashboard.lastHash).toBeUndefined()
  })
})
