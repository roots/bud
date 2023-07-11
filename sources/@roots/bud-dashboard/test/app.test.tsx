import React from '@roots/bud-support/ink'
// @ts-ignore
import {render} from 'ink-testing-library'
import {describe, expect, it} from 'vitest'
import stripAnsi from '@roots/bud-support/strip-ansi'
import {Application} from '../src/application'
import {StatsCompilation} from 'webpack'

const mockCompilations: Array<Partial<StatsCompilation>> = [
  {
    name: `mock`,
    assets: [
      {
        type: `asset`,
        name: `foo.js`,
        info: {},
        size: 1000,
        emitted: true,
        comparedForEmit: true,
        cached: true,
      },
      {
        type: `asset`,
        name: `foo.png`,
        info: {},
        size: 1000,
        emitted: true,
        comparedForEmit: true,
        cached: true,
      },
    ],
    entrypoints: {
      foo: {
        name: `foo`,
        assets: [{name: `foo.js`}],
      },
    },
    errors: [],
    modules: [],
    warnings: [],
    errorCount: 0,
    warningCount: 0,
  },
]

describe.skip(`@roots/bud-dashboard app component`, () => {
  it(`should render entrypoints`, () => {
    const {lastFrame} = render(
      <Application
        basedir={`/foo/bar`}
        mode="production"
        compilations={mockCompilations}
        displayEntrypoints={true}
      />,
    )

    expect(stripAnsi(lastFrame())).toMatchSnapshot()
  })

  it(`should not render entrypoints when entrypoints is empty`, () => {
    const {lastFrame} = render(
      <Application
        basedir={`/foo/bar`}
        mode="production"
        compilations={[{...mockCompilations[0], entrypoints: {}}]}
        displayEntrypoints={true}
      />,
    )
  })

  it(`should not render entrypoints when entrypoints are undefined`, () => {
    const {lastFrame} = render(
      <Application
        basedir={`/foo/bar`}
        mode="production"
        // @ts-ignore
        compilations={[{entrypoints: false}]}
        displayEntrypoints={true}
      />,
    )

    expect(stripAnsi(lastFrame())).toMatchSnapshot()
  })

  it(`should not render entrypoints when entrypoint assets are undefined`, () => {
    const ink = render(
      <Application
        basedir={`/foo/bar`}
        mode="production"
        compilations={[
          {
            entrypoints: {
              foo: {assets: []},
            },
          },
        ]}
        displayEntrypoints={true}
      />,
    )

    expect(stripAnsi(ink.lastFrame())).toMatchSnapshot()

    ink.rerender(
      <Application
        basedir={`/foo/bar`}
        mode="production"
        compilations={[
          {
            entrypoints: {
              foo: {},
            },
          },
        ]}
        displayEntrypoints={true}
      />,
    )

    expect(stripAnsi(ink.lastFrame())).toMatchSnapshot()
  })

  it(`should render compilation count for multi-compiler`, () => {
    const {lastFrame} = render(
      <Application
        basedir={`/foo/bar`}
        mode="production"
        compilations={[mockCompilations[0], mockCompilations[0]]}
        displayEntrypoints={true}
      />,
    )

    expect(stripAnsi(lastFrame())).toMatchSnapshot()
  })

  it(`should render assets`, () => {
    const {lastFrame} = render(
      <Application
        basedir={`/foo/bar`}
        mode="production"
        compilations={mockCompilations}
        displayAssets={true}
      />,
    )

    expect(stripAnsi(lastFrame())).toMatchSnapshot()
  })

  it(`should render server info`, () => {
    const {lastFrame} = render(
      <Application
        basedir={`/foo/bar`}
        compilations={mockCompilations}
        mode="development"
        devUrl={new URL(`http://localhost:3000`)}
        publicDevUrl={new URL(`http://example.test:3000/`)}
        proxy={true}
        proxyUrl={new URL(`http://localhost:8080/`)}
        publicProxyUrl={new URL(`http://example.test/`)}
        displayServerInfo={true}
        displayAssets={true}
        displayEntrypoints={true}
      />,
    )

    expect(stripAnsi(lastFrame())).toMatch(/Network/)
    expect(stripAnsi(lastFrame())).toMatch(/localhost:8080/)
    expect(stripAnsi(lastFrame())).toMatch(/dev/)
    expect(stripAnsi(lastFrame())).toMatch(/proxy/)
  })
})
