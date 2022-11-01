import type {Bud} from '@roots/bud-framework'
import React from '@roots/bud-support/react'
import {render} from 'ink-testing-library'
import {describe, expect, it, vi} from 'vitest'

import App from './app'

const mockLogger = {
  instance: {
    scope: vi.fn(),
  },
  scope: [],
}

mockLogger.instance.scope = vi.fn(() => mockLogger)

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
    filter: vi.fn(() => new URL(`http://localhost:8080`)),
  },
  logger: mockLogger,
  server: {
    connection: {
      url: new URL(`http://localhost:3000`),
    },
  },
} as unknown as Bud

describe(`@roots/bud-dashboard app component`, () => {
  it(`should render stats`, async () => {
    const {lastFrame} = render(
      <App
        context={bud.context}
        mode="development"
        compilations={mockCompilations}
        devUrl={new URL(`http://localhost:3000`)}
        proxyUrl={new URL(`http://localhost:8080`)}
        watchFiles={new Set([`foo`])}
        isTTY={true}
        displayServerInfo={true}
        displayAssets={true}
        displayEntrypoints={true}
      />,
    )

    expect(lastFrame()).toContain(`compiled  modules`)
  })

  it(`should render server info`, async () => {
    const {lastFrame} = render(
      // @ts-ignore
      <App
        context={bud.context}
        mode="development"
        compilations={mockCompilations}
        devUrl={new URL(`http://localhost:3000`)}
        proxyUrl={new URL(`http://localhost:8080`)}
        watchFiles={new Set([`foo`])}
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

  it(`should render watch list`, async () => {
    const {lastFrame} = render(
      <App
        context={bud.context}
        mode="development"
        compilations={mockCompilations}
        devUrl={new URL(`http://localhost:3000`)}
        proxyUrl={new URL(`http://localhost:8080`)}
        watchFiles={new Set([`foo`])}
        isTTY={true}
        displayServerInfo={true}
        displayAssets={true}
        displayEntrypoints={true}
      />,
    )

    expect(lastFrame()).toContain(`watching project sources`)
  })

  it(`should not render watch list in prod`, async () => {
    const {lastFrame} = render(
      <App
        context={bud.context}
        mode="production"
        compilations={mockCompilations}
        devUrl={new URL(`http://localhost:3000`)}
        proxyUrl={new URL(`http://localhost:8080`)}
        watchFiles={new Set([`foo`])}
        isTTY={true}
        displayServerInfo={true}
        displayAssets={true}
        displayEntrypoints={true}
      />,
    )

    expect(lastFrame()).not.toContain(`watching project sources`)
  })
})
