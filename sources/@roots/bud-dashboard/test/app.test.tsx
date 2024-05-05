import React from '@roots/bud-support/ink'
import stripAnsi from '@roots/bud-support/strip-ansi'
import {render} from 'ink-testing-library'
import {describe, expect, it} from 'vitest'
import {StatsCompilation} from 'webpack'

import {Application} from '../src/application.js'

const enum Char {
  BottomLeft = `╰`,
  BottomRight = `╯`,
  Empty = ``,
  Horizontal = `─`,
  NewLine = `\n`,
  Space = ` `,
  TopLeft = `╭`,
  TopRight = `╮`,
  Vertical = `│`,
}

const startsWith = (line: string, char: Char) =>
  new RegExp(`^${char}`).test(line)

const mockCompilations: Array<Partial<StatsCompilation>> = [
  {
    assets: [
      {
        cached: true,
        comparedForEmit: true,
        emitted: true,
        info: {},
        name: `foo.js`,
        size: 1000,
        type: `asset`,
      },
      {
        cached: true,
        comparedForEmit: true,
        emitted: true,
        info: {},
        name: `foo.png`,
        size: 1000,
        type: `asset`,
      },
    ],
    entrypoints: {
      foo: {
        assets: [{name: `foo.js`}],
        name: `foo`,
      },
    },
    errors: [],
    errorsCount: 0,
    hash: `mock-hash`,
    modules: [
      {
        cached: true,
        comparedForEmit: true,
        emitted: true,
        info: {},
        name: `foo.js`,
        size: 1000,
        type: `asset`,
      },
      {
        cached: true,
        comparedForEmit: true,
        emitted: true,
        info: {},
        name: `foo.png`,
        size: 1000,
        type: `asset`,
      },
    ],
    name: `mock`,
    outputPath: `/path/mock/to`,
    warnings: [],
    warningsCount: 0,
  },
]

const mockCompilationsWithErrors: Array<Partial<StatsCompilation>> = [
  {
    ...mockCompilations[0],
    errors: [new Error(`Bad error`)],
  },
]

describe(`@roots/bud-dashboard app component`, () => {
  it(`should not render without a hash`, () => {
    const {frames} = render(
      // @ts-ignore
      <Application compilations={[]} />,
    )
    expect(stripAnsi(frames.pop() as string)).toMatchInlineSnapshot(`""`)
  })

  it(`should render basedir when basedir prop and compilation.outputPath are set`, () => {
    const {frames} = render(
      <Application
        basedir={`/path/mock/from`}
        compilations={[
          {
            assets: [
              {
                cached: true,
                comparedForEmit: true,
                emitted: true,
                info: {},
                name: `foo.js`,
                size: 1000,
                type: `asset`,
              },
              {
                cached: true,
                comparedForEmit: true,
                emitted: true,
                info: {},
                name: `foo.png`,
                size: 1000,
                type: `asset`,
              },
            ],
            entrypoints: {
              foo: {
                assets: [{name: `foo.js`, size: 100}],
                name: `foo`,
              },
            },
            errors: [],
            errorsCount: 0,
            hash: `mock-hash`,
            modules: [],
            name: `mock`,
            outputPath: `/path/mock/to`,
            warnings: [],
            warningsCount: 0,
          },
        ]}
        mode="production"
      />,
    )

    expect(stripAnsi(frames.pop() as string)).toMatchInlineSnapshot(`
      "
      ╭ mock [mock-hash]                                                                         ./../to
      │
      │
      ╰ 0 modules [0/0 modules cached]
      "
    `)
  })

  it(`should render entrypoints`, () => {
    const {frames} = render(
      <Application
        compilations={mockCompilations}
        displayEntrypoints={true}
        mode="production"
      />,
    )
    expect(stripAnsi(frames.pop() as string)).toMatchInlineSnapshot(`
      "
      ╭ mock [mock-hash]
      │
      │ foo
      │  ◉ foo.js                                                                                   1 kB
      │
      ╰ 2 modules [2/2 modules cached]
      "
    `)
  })

  it(`should not render entrypoints when entrypoints is empty`, () => {
    const {frames} = render(
      <Application
        compilations={[{...mockCompilations[0], entrypoints: {}}]}
        displayEntrypoints={true}
        mode="production"
      />,
    )
    expect(stripAnsi(frames.pop() as string)).toMatchInlineSnapshot(`
      "
      ╭ mock [mock-hash]
      │
      │
      ╰ 2 modules [2/2 modules cached]
      "
    `)
  })

  it(`should not render entrypoints when entrypoints are undefined`, () => {
    const {frames} = render(
      <Application
        // @ts-ignore
        compilations={[{entrypoints: false, hash: `foo`}]}
        displayEntrypoints={true}
        mode="production"
      />,
    )
    expect(stripAnsi(frames.pop() as string)).toMatchInlineSnapshot(`
      "
      ╭ compilation [foo]
      │
      │
      ╰ ...
      "
    `)
  })

  it(`should not render entrypoints when entrypoint assets are undefined`, () => {
    const {frames} = render(
      <Application
        basedir={`/foo/bar`}
        compilations={[
          {
            entrypoints: {
              foo: {assets: []},
            },
            hash: `foo`,
          },
        ]}
        displayEntrypoints={true}
        mode="production"
      />,
    )
    expect(stripAnsi(frames.pop() as string)).toMatchInlineSnapshot(`
      "
      ╭ compilation [foo]
      │
      │
      ╰ ...
      "
    `)

    const {frames: frames2} = render(
      <Application
        basedir={`/foo/bar`}
        compilations={[
          {
            entrypoints: {
              foo: {},
            },
            hash: `foo`,
          },
        ]}
        displayEntrypoints={true}
        mode="production"
      />,
    )

    expect(stripAnsi(frames2.pop() as string)).toMatchInlineSnapshot(`
      "
      ╭ compilation [foo]
      │
      │
      ╰ ...
      "
    `)
  })

  it(`should render compilation count for multi-compiler`, () => {
    const {frames} = render(
      <Application
        compilations={[mockCompilations[0], mockCompilations[0]]}
        displayEntrypoints={true}
        mode="production"
      />,
    )

    expect(stripAnsi(frames.pop() as string)).toMatchInlineSnapshot(`
      "
      ╭ mock [1/2] [mock-hash]
      │
      │ foo
      │  ◉ foo.js                                                                                   1 kB
      │
      ╰ 2 modules [2/2 modules cached]

      ╭ mock [2/2] [mock-hash]
      │
      │ foo
      │  ◉ foo.js                                                                                   1 kB
      │
      ╰ 2 modules [2/2 modules cached]
      "
    `)
  })

  it(`should render assets`, () => {
    const {frames} = render(
      <Application
        compilations={mockCompilations}
        displayAssets={true}
        mode="production"
      />,
    )
    expect(stripAnsi(frames.pop() as string)).toMatchInlineSnapshot(`
      "
      ╭ mock [mock-hash]
      │
      │ assets
      │  ◉ foo.png                                                                                  1 kB
      │  … 1 additional asset not shown
      │
      ╰ 2 modules [2/2 modules cached]
      "
    `)
  })

  it(`should render error`, () => {
    const {frames} = render(
      <Application
        compilations={mockCompilationsWithErrors}
        mode="production"
      />,
    )
    expect(stripAnsi(frames.pop() as string)).toMatchInlineSnapshot(`
      "
      ╭ mock [mock-hash]
      │
      │ │ Bad error
      │
      ╰ 2 modules [2/2 modules cached]
      "
    `)
  })

  it(`should render server info`, () => {
    const {frames} = render(
      <Application
        compilations={mockCompilations}
        devUrl={new URL(`http://localhost:3000`)}
        displayAssets={true}
        displayEntrypoints={true}
        displayServerInfo={true}
        mode="development"
        proxy={true}
        proxyUrl={new URL(`http://localhost:8080/`)}
        publicDevUrl={new URL(`http://example.test:3000/`)}
        publicProxyUrl={new URL(`http://example.test/`)}
      />,
    )

    const output = stripAnsi(frames.pop() as string)
    expect(output).toContain(`Network`)
    expect(output).toContain(`› Proxy`)
    expect(output).toContain(`› Dev`)
  })

  it(`should not render proxy info when proxy not set`, () => {
    const {frames} = render(
      <Application
        basedir={`/foo/bar`}
        compilations={mockCompilations}
        devUrl={new URL(`http://localhost:3000`)}
        displayAssets={true}
        displayEntrypoints={true}
        displayServerInfo={true}
        mode="development"
        proxy={false}
        proxyUrl={new URL(`http://localhost:8080/`)}
        publicDevUrl={new URL(`http://example.test:3000/`)}
        publicProxyUrl={new URL(`http://example.test/`)}
      />,
    )
    expect(stripAnsi(frames.pop() as string)).not.toMatch(/.*Proxy.*/)
  })

  it(`should not throw when crazy input happens`, () => {
    const {lastFrame: basedirNumber} = render(
      // @ts-ignore
      <Application basedir={6} />,
    )
    expect(basedirNumber()).toBe(Char.Empty)

    const {lastFrame: compilationTypeStringArray} = render(
      // @ts-ignore
      <Application compilations={[`foo`]} />,
    )
    expect(stripAnsi(compilationTypeStringArray() as string)).toBe(Char.Empty)

    const {lastFrame: compilationTypeNumberArray} = render(
      // @ts-ignore
      <Application compilations={[1]} />,
    )
    expect(stripAnsi(compilationTypeNumberArray() as string)).toBe(Char.Empty)

    const {lastFrame: compilationTypeString} = render(
      // @ts-ignore
      <Application compilations={`foo`} />,
    )
    expect(stripAnsi(compilationTypeString() as string)).toBe(Char.Empty)
  })
})
