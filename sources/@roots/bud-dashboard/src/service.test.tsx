import {Bud, factory} from '@repo/test-kit/bud'
import {Service} from '@roots/bud-framework/service'
import {beforeEach, describe, expect, it} from 'vitest'
import React from '@roots/bud-support/react'

import Dashboard from './index.js'

describe(`Dashboard`, () => {
  let bud: Bud
  let dashboard: Dashboard

  beforeEach(async () => {
    bud = await factory()
    bud.context.args.log = true
    dashboard = new Dashboard(() => bud)
  })

  it(`should be a Service`, async () => {
    expect(dashboard).toBeInstanceOf(Service)
  })

  it(`should return early from dashboard.update when there are no stats provided`, async () => {
    try {
      await dashboard.update(
        // @ts-ignore
        undefined,
      )
    } catch (e) {}
    expect(dashboard.stats).toBeUndefined()
  })
})
