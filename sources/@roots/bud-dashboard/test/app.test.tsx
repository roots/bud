import React from '@roots/bud-support/ink'
// @ts-ignore
import {render} from 'ink-testing-library'
import {describe, expect, it} from 'vitest'
import stripAnsi from '@roots/bud-support/strip-ansi'
import {Application} from '@roots/bud-dashboard/application'
import {StatsCompilation} from 'webpack'

const enum Char {
  TopLeft = `╭`,
  TopRight = `╮`,
  BottomLeft = `╰`,
  BottomRight = `╯`,
  Vertical = `│`,
  Horizontal = `─`,
  Empty = ``,
  Space = ` `,
  NewLine = `\n`,
}

const startsWith = (line: string, char: Char) =>
  new RegExp(`^${char}`).test(line)

const isFormattedAsset = (line: string) =>
  startsWith(line, Char.Vertical) && /›\s*/.test(line)

const mockCompilations: Array<Partial<StatsCompilation>> = [
  {
    name: `mock`,
    hash: `mock-hash`,
    outputPath: `/path/mock/to`,
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

const mockCompilationsWithErrors: Array<Partial<StatsCompilation>> = [
  {
    ...mockCompilations[0],
    errors: [new Error(`Bad error`)],
  },
]

describe(`@roots/bud-dashboard app component`, () => {
  it(`should not render without a hash`, () => {
    const {lastFrame} = render(
      // @ts-ignore
      <Application compilations={[]} />,
    )
    const lines = stripAnsi(lastFrame())

    expect(lines).toBe(Char.NewLine)
  })

  it(`should render basedir when basedir prop and compilation.outputPath are set`, () => {
    const {lastFrame} = render(
      <Application
        mode="production"
        compilations={mockCompilations}
        basedir={`/path/mock/from`}
      />,
    )
    const lines = stripAnsi(lastFrame()).split(Char.NewLine)

    expect(lines[0]).toBe(Char.Empty)

    expect(startsWith(lines[1], Char.TopLeft)).toBe(true)
    expect(lines[1]).toMatch(/mock\s\[mock\-hash\]\s+\.\/\.\.\/to$/)
  })

  it(`should render entrypoints`, () => {
    const {lastFrame} = render(
      <Application
        mode="production"
        compilations={mockCompilations}
        displayEntrypoints={true}
      />,
    )
    const lines = stripAnsi(lastFrame()).split(Char.NewLine)

    expect(lines[0]).toBe(Char.Empty)

    expect(startsWith(lines[1], Char.TopLeft)).toBe(true)
    expect(lines[1]).toMatch(/mock \[mock\-hash\]$/)

    expect(lines[2]).toBe(Char.Vertical)

    expect(startsWith(lines[3], Char.Vertical)).toBe(true)
    expect(lines[3]).toMatch(/ foo/)

    expect(isFormattedAsset(lines[4])).toBe(true)
    expect(lines[4]).toMatch(/\sfoo\.js\s/)

    expect(lines[5]).toBe(Char.Vertical)

    expect(startsWith(lines[6], Char.BottomLeft)).toBe(true)
    expect(lines[6]).toMatch(/0ms$/)

    expect(lines[7]).toBe(Char.Empty)
    expect(lines[8]).toBeUndefined()
  })

  it(`should not render entrypoints when entrypoints is empty`, () => {
    const {lastFrame} = render(
      <Application
        mode="production"
        compilations={[{...mockCompilations[0], entrypoints: {}}]}
        displayEntrypoints={true}
      />,
    )
    const lines = stripAnsi(lastFrame()).split(Char.NewLine)
    expect(lines[0]).toBe(Char.Empty)

    expect(startsWith(lines[1], Char.TopLeft)).toBe(true)
    expect(lines[1]).toMatch(/mock \[mock\-hash\]$/)

    expect(lines[2]).toBe(Char.Vertical)
    expect(lines[3]).toBe(Char.Vertical)

    expect(startsWith(lines[4], Char.BottomLeft)).toBe(true)
    expect(lines[4]).toMatch(/0ms$/)

    expect(lines[5]).toBe(Char.Empty)
  })

  it(`should not render entrypoints when entrypoints are undefined`, () => {
    const {lastFrame} = render(
      <Application
        mode="production"
        // @ts-ignore
        compilations={[{hash: `foo`, entrypoints: false}]}
        displayEntrypoints={true}
      />,
    )

    const lines = stripAnsi(lastFrame()).split(Char.NewLine)
    expect(lines[0]).toBe(Char.Empty)

    expect(startsWith(lines[1], Char.TopLeft)).toBe(true)
    expect(lines[1]).toMatch(/ compilation \[foo\]$/)
    expect(lines[2]).toBe(Char.Vertical)
    expect(lines[3]).toBe(Char.Vertical)

    expect(startsWith(lines[4], Char.BottomLeft)).toBe(true)
    expect(lines[4]).toMatch(/...$/)
  })

  it(`should not render entrypoints when entrypoint assets are undefined`, () => {
    const ink = render(
      <Application
        basedir={`/foo/bar`}
        mode="production"
        compilations={[
          {
            hash: `foo`,
            entrypoints: {
              foo: {assets: []},
            },
          },
        ]}
        displayEntrypoints={true}
      />,
    )
    let lines = stripAnsi(ink.lastFrame()).split(Char.NewLine)
    expect(lines[0]).toBe(Char.Empty)

    expect(startsWith(lines[1], Char.TopLeft)).toBe(true)
    expect(lines[1]).toMatch(/ compilation \[foo\]$/)

    expect(lines[2]).toBe(Char.Vertical)
    expect(lines[3]).toBe(Char.Vertical)

    expect(startsWith(lines[4], Char.BottomLeft)).toBe(true)
    expect(lines[4]).toMatch(/\.\.\.$/)
    expect(lines[5]).toBe(Char.Empty)

    ink.rerender(
      <Application
        basedir={`/foo/bar`}
        mode="production"
        compilations={[
          {
            hash: `foo`,
            entrypoints: {
              foo: {},
            },
          },
        ]}
        displayEntrypoints={true}
      />,
    )

    lines = stripAnsi(ink.lastFrame()).split(Char.NewLine)
    expect(lines[0]).toBe(Char.Empty)

    expect(startsWith(lines[1], Char.TopLeft)).toBe(true)
    expect(lines[1]).toMatch(/compilation \[foo\]$/)
    expect(lines[2]).toBe(Char.Vertical)
    expect(lines[3]).toBe(Char.Vertical)

    expect(startsWith(lines[4], Char.BottomLeft)).toBe(true)
    expect(lines[4]).toMatch(/.../)

    expect(lines[5]).toBe(Char.Empty)
  })

  it(`should render compilation count for multi-compiler`, () => {
    const {lastFrame} = render(
      <Application
        mode="production"
        compilations={[mockCompilations[0], mockCompilations[0]]}
        displayEntrypoints={true}
      />,
    )

    const lines = stripAnsi(lastFrame()).split(Char.NewLine)
    expect(lines[0]).toBe(Char.Empty)

    expect(startsWith(lines[1], Char.TopLeft)).toBe(true)
    expect(lines[1]).toMatch(/mock \[1\/2\] \[mock\-hash\]$/)

    expect(lines[2]).toBe(Char.Vertical)
    expect(lines[3]).toMatch(/│ foo/)
    expect(lines[4]).toMatch(/│  › foo.js /)
    expect(lines[5]).toBe(Char.Vertical)

    expect(startsWith(lines[6], Char.BottomLeft)).toBe(true)
    expect(lines[6]).toMatch(/0ms$/)
    expect(lines[7]).toBe(Char.Empty)

    expect(startsWith(lines[8], Char.TopLeft)).toBe(true)
    expect(lines[8]).toMatch(/mock \[2\/2\] \[mock\-hash\]$/)

    expect(lines[9]).toBe(Char.Vertical)
    expect(lines[10]).toMatch(/│ foo/)
    expect(lines[11]).toMatch(/│  › foo.js /)
    expect(lines[12]).toBe(Char.Vertical)
    expect(lines[13]).toMatch(/╰ 0ms/)
    expect(lines[14]).toBe(Char.Empty)
  })

  it(`should render assets`, () => {
    const {lastFrame} = render(
      <Application
        mode="production"
        compilations={mockCompilations}
        displayAssets={true}
      />,
    )
    const lines = stripAnsi(lastFrame()).split(Char.NewLine)
    expect(lines[0]).toBe(Char.Empty)

    expect(startsWith(lines[1], Char.TopLeft)).toBe(true)
    expect(lines[1]).toMatch(/mock \[mock\-hash\]$/)

    expect(lines[2]).toBe(Char.Vertical)

    expect(startsWith(lines[3], Char.Vertical)).toBe(true)
    expect(lines[3]).toMatch(/│ assets/)

    expect(isFormattedAsset(lines[4])).toBe(true)
    expect(lines[4]).toMatch(/foo.png/)

    expect(lines[5]).toMatch(/│  … 1 additional asset not shown/)
    expect(lines[6]).toBe(Char.Vertical)

    expect(startsWith(lines[7], Char.BottomLeft)).toBe(true)
    expect(lines[7]).toMatch(/0ms$/)
    expect(lines[8]).toBe(Char.Empty)
  })

  it(`should render error`, () => {
    const {lastFrame} = render(
      <Application
        compilations={mockCompilationsWithErrors}
        mode="production"
      />,
    )
    const lines = stripAnsi(lastFrame()).split(Char.NewLine)
    expect(lines[0]).toBe(Char.Empty)

    expect(startsWith(lines[1], Char.TopLeft)).toBe(true)
    expect(lines[1]).toMatch(/mock \[mock\-hash\]$/)

    expect(lines[2]).toBe(Char.Vertical)
    expect(lines[3]).toMatch(/│ │ Bad error/)
    expect(lines[4]).toBe(Char.Vertical)

    expect(startsWith(lines[5], Char.BottomLeft)).toBe(true)
    expect(lines[5]).toMatch(/0ms$/)
    expect(lines[6]).toBe(Char.Empty)
  })

  it(`should render server info`, () => {
    const {lastFrame} = render(
      <Application
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
    const lines = stripAnsi(lastFrame()).split(Char.NewLine)
    expect(lines[0]).toBe(Char.Empty)

    expect(startsWith(lines[1], Char.TopLeft)).toBe(true)
    expect(lines[1]).toMatch(/mock \[mock\-hash\]$/)

    expect(lines[2]).toBe(Char.Vertical)
    expect(lines[3]).toMatch(/│ foo/)

    expect(isFormattedAsset(lines[4])).toBe(true)
    expect(lines[4]).toMatch(/foo.js /)
    expect(lines[4]).toMatch(/1 kB$/)

    expect(lines[5]).toBe(Char.Vertical)

    expect(startsWith(lines[6], Char.Vertical)).toBe(true)
    expect(lines[6]).toMatch(/assets$/)

    expect(isFormattedAsset(lines[7])).toBe(true)
    expect(lines[7]).toMatch(/ foo.png /)
    expect(lines[7]).toMatch(/1 kB$/)

    expect(lines[8]).toMatch(/│  … 1 additional asset not shown/)
    expect(lines[9]).toBe(Char.Vertical)

    expect(startsWith(lines[10], Char.BottomLeft)).toBe(true)
    expect(lines[10]).toMatch(/0ms$$/)

    expect(lines[11]).toBe(Char.Empty)
    expect(lines[12]).toMatch(/Network/)
    expect(lines[13]).toMatch(/ › proxy  ┄ http:\/\/localhost:\d+\//)
    expect(lines[14]).toBe(Char.Empty)
    expect(lines[15]).toMatch(/          ┄ http:\/\/example\.test\//)
    expect(lines[16]).toMatch(/ › dev    ┄ http:\/\/localhost:\d+\//)
    expect(lines[17]).toMatch(
      /          ┄ http:\/\/\d+\.\d+\.\d+\.\d+:\d+\//,
    )
    expect(lines[18]).toMatch(/          ┄ http:\/\/example\.test:\d+\//)
    expect(lines[19]).toBe(Char.Empty)
  })

  it(`should not render proxy info when proxy not set`, () => {
    const {lastFrame} = render(
      <Application
        basedir={`/foo/bar`}
        compilations={mockCompilations}
        mode="development"
        devUrl={new URL(`http://localhost:3000`)}
        publicDevUrl={new URL(`http://example.test:3000/`)}
        proxy={false}
        proxyUrl={new URL(`http://localhost:8080/`)}
        publicProxyUrl={new URL(`http://example.test/`)}
        displayServerInfo={true}
        displayAssets={true}
        displayEntrypoints={true}
      />,
    )
    const lines = stripAnsi(lastFrame()).split(Char.NewLine)
    expect(lines[13]).toMatch(/ › dev    ┄ http:\/\/localhost:\d+\//)
  })

  it(`should not throw when crazy input happens`, () => {
    let textError: string = ``
    try {
      textError = stripAnsi(render(<>{`foo`}</>).lastFrame())
    } catch (e) {}
    expect(textError.trim().split(`\n`)[0]).toMatch(/ERROR/)

    const {lastFrame: basedirNumber} = render(
      // @ts-ignore
      <Application basedir={6} />,
    )
    expect(basedirNumber()).toBe(Char.Empty)

    const {lastFrame: compilationTypeStringArray} = render(
      // @ts-ignore
      <Application compilations={[`foo`]} />,
    )
    expect(stripAnsi(compilationTypeStringArray())).toBe(Char.NewLine)

    const {lastFrame: compilationTypeNumberArray} = render(
      // @ts-ignore
      <Application compilations={[1]} />,
    )
    expect(stripAnsi(compilationTypeNumberArray())).toBe(Char.NewLine)

    const {lastFrame: compilationTypeString} = render(
      // @ts-ignore
      <Application compilations={`foo`} />,
    )
    expect(stripAnsi(compilationTypeString())).toBe(Char.Empty)
  })
})
