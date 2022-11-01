import {beforeEach, describe, expect, it, vi} from 'vitest'

import {bootstrap as subject} from './bootstrap'

let bud = {
  info: vi.fn(),
  success: vi.fn(),
  context: {basedir: `/foo`},
  hooks: {fromAsyncMap: null, fromMap: null, on: vi.fn()},
  path: vi.fn((...args) => `/test-return`),
  root: null,
}

bud.hooks.fromAsyncMap = vi.fn(() => bud)
bud.hooks.fromMap = vi.fn(() => bud)
bud.root = bud

let context = {
  label: `project`,
  basedir: `/foo/bar`,
  bud: {name: `@roots/bud`},
  manifest: {name: `project`},
  mode: `production`,
  args: {devtool: `eval`, log: true},
  config: {},
  extensions: [],
  services: [],
  env: {FOO: `foo`},
}

describe(`bootstrap`, function () {
  let bootstrap

  beforeEach(async () => {
    vi.clearAllMocks()
    bud.context.basedir = `/foo`
    bud.path = vi.fn(() => `/test-return`)
    bootstrap = subject.bind(bud)
  })

  it(`is a function`, () => {
    expect(bootstrap).toBeInstanceOf(Function)
  })

  it(`returns Bud`, async () => {
    expect(await bootstrap(context)).toBe(bud)
  })
})
