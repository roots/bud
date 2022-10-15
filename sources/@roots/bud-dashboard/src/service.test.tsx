import {beforeEach, describe, expect, it, jest} from '@jest/globals'
import type {Bud} from '@roots/bud-framework/bud'
import {Service} from '@roots/bud-framework/service'
import React from '@roots/bud-support/react'
import {render} from 'ink-testing-library'

import Dashboard from './index.js'
import App from './render/app'

const mockLogger = {
  instance: {
    scope: jest.fn(),
  },
  scope: [],
}

mockLogger.instance.scope = jest.fn(() => mockLogger)

const mockCompilations = [{}]

const bud = {
  isDevelopment: true,
  context: {
    args: {
      ci: false,
      log: true,
    },
  },
  hooks: {
    filter: jest.fn(() => new URL(`http://localhost:8080`)),
  },
  logger: mockLogger,
  server: {
    connection: {
      url: new URL(`http://localhost:3000`),
    },
  },
} as unknown as Bud

describe(`Dashboard`, () => {
  let dashboard

  beforeEach(() => {
    dashboard = new Dashboard(bud)
  })

  it(`should be a Service`, async () => {
    expect(dashboard).toBeInstanceOf(Service)
  })

  it(`should render stats`, async () => {
    expect(dashboard.stats).toBeInstanceOf(Function)
  })

  it(`should render stats`, async () => {
    const {lastFrame} = render(
      // @ts-ignore
      <App
        compilations={mockCompilations}
        app={bud}
        isTTY={true}
        displayServerInfo={true}
        displayAssets={true}
        displayEntrypoints={true}
      />,
    )

    expect(lastFrame()).toContain(`compiled  modules`)
  })

  it(`should render stats`, async () => {
    const {lastFrame} = render(
      // @ts-ignore
      <App
        compilations={mockCompilations}
        app={bud}
        isTTY={true}
        displayServerInfo={true}
        displayAssets={true}
        displayEntrypoints={true}
      />,
    )

    expect(lastFrame()).toContain(`proxy`)
    expect(lastFrame()).toContain(`internal`)
    expect(lastFrame()).toContain(`external`)
  })
})
