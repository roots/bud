import {Bud, factory} from '@repo/test-kit'
import {Service} from '@roots/bud-framework/service'
import {beforeEach, describe, expect, it} from 'vitest'

import {Dashboard} from '@roots/bud-dashboard/service'

describe(`@roots/bud-dashboard`, () => {
  let bud: Bud
  let dashboard: Dashboard

  beforeEach(async () => {
    bud = await factory()
    bud.context.log = true
    dashboard = new Dashboard(() => bud)
  })

  it(`should be a Service`, async () => {
    expect(dashboard).toBeInstanceOf(Service)
  })

  it(`should return early from dashboard.update when there are no stats provided`, async () => {
    dashboard.updateStats(
      // @ts-ignore
      undefined,
    )
    expect(dashboard.stats).toBeUndefined()
  })
})
