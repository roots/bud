import React from '@roots/bud-support/ink'
// @ts-ignore
import {render} from 'ink-testing-library'
import {describe, expect, it} from 'vitest'
import stripAnsi from '@roots/bud-support/strip-ansi'
import {Application} from '../src/dashboard/app'
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

describe(`@roots/bud-dashboard app component`, () => {
  it(`should render status`, () => {
    const result = render(
      <Application
        basedir={`/foo/bar`}
        mode="production"
        status="testing status"
      />,
    )

    expect(stripAnsi(result.lastFrame())).toMatchInlineSnapshot(`
      "
      .   testing status
      "
    `)

    result.rerender(
      <Application
        basedir={`/foo/bar`}
        mode="production"
        status="testing status 2"
      />,
    )

    expect(stripAnsi(result.lastFrame())).toMatchInlineSnapshot(`
      "
      .   testing status 2
      "
    `)
  })

  it(`should render entrypoints`, () => {
    const {lastFrame} = render(
      <Application
        basedir={`/foo/bar`}
        mode="production"
        compilations={mockCompilations}
        displayEntrypoints={true}
      />,
    )

    expect(stripAnsi(lastFrame())).toMatchInlineSnapshot(`
      "
      ╭─ ☰ mock
      │
      │ ╭─ foo
      │ │
      │ │ › foo.js                                                                                    1 kB
      │ │
      │ ╰─ undefined bytes
      │
      ╰─ ...
      "
    `)
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

    expect(stripAnsi(lastFrame())).toMatchInlineSnapshot(`
      "
      ╭─ ☰ mock
      │
      │
      ╰─ ...
      "
    `)
  })

  it(`should not render entrypoints when entrypoints are undefined`, () => {
    const {lastFrame} = render(
      <Application
        basedir={`/foo/bar`}
        mode="production"
        compilations={[{entrypoints: false}]}
        displayEntrypoints={true}
      />,
    )

    expect(stripAnsi(lastFrame())).toMatchInlineSnapshot(`
      "
      ╭─ ☰ compilation
      │
      │
      ╰─ ...
      "
    `)
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

    expect(stripAnsi(ink.lastFrame())).toMatchInlineSnapshot(`
      "
      ╭─ ☰ compilation
      │
      │ ╭─ entrypoint
      │ │
      │ │
      │ ╰─ undefined bytes
      │
      ╰─ ...
      "
    `)

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

    expect(stripAnsi(ink.lastFrame())).toMatchInlineSnapshot(`
      "
      ╭─ ☰ compilation
      │
      │ ╭─ entrypoint
      │ │
      │ │
      │ ╰─ undefined bytes
      │
      ╰─ ...
      "
    `)
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

    expect(stripAnsi(lastFrame())).toMatchInlineSnapshot(`
      "
      ╭─ ☰ mock [1/2]
      │
      │ ╭─ foo
      │ │
      │ │ › foo.js                                                                                    1 kB
      │ │
      │ ╰─ undefined bytes
      │
      ╰─ ...

      ╭─ ☰ mock [2/2]
      │
      │ ╭─ foo
      │ │
      │ │ › foo.js                                                                                    1 kB
      │ │
      │ ╰─ undefined bytes
      │
      ╰─ ...
      "
    `)
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

    expect(stripAnsi(lastFrame())).toMatchInlineSnapshot(`
      "
      ╭─ ☰ mock
      │
      │ ╭─ assets
      │ │
      │ │ › foo.png                                                                                   1 kB
      │ │
      │ ╰─ 1 kB
      │
      ╰─ ...
      "
    `)
  })

  it(`should render server info`, () => {
    const {lastFrame} = render(
      <Application
        basedir={`/foo/bar`}
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

    expect(stripAnsi(lastFrame())).toMatch(/Server info/)
    expect(stripAnsi(lastFrame())).toMatch(/localhost:8080/)
    expect(stripAnsi(lastFrame())).toMatch(/Watching project sources/)
    expect(stripAnsi(lastFrame())).toMatch(/dev/)
    expect(stripAnsi(lastFrame())).toMatch(/proxy/)

    /*     expect(stripAnsi(lastFrame())).toMatchInlineSnapshot(`
      "
      ╭─ ⬢ Server info
      │
      │  proxy  ┄ http://localhost:8080/
      │
      │         ┄ http://example.test/
      │
      │  dev    ┄ http://localhost:3000/
      │         ┄ http://192.168.1.16:3000/
      │         ┄ http://example.test:3000/
      │
      ╰─ Watching project sources
      "
    `) */
  })
})
