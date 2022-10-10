import {beforeEach, describe, expect, it, jest} from '@jest/globals'

import {bootstrap as subject} from './bootstrap'

let bud = {
  info: jest.fn(),
  success: jest.fn(),
  context: {basedir: `/foo`},
  hooks: {fromAsyncMap: null, fromMap: null, on: jest.fn()},
  path: jest.fn((...args) => `/test-return`),
  root: null,
}

// @ts-ignore
bud.hooks.fromAsyncMap = jest.fn(() => bud)
// @ts-ignore
bud.hooks.fromMap = jest.fn(() => bud)
// @ts-ignore
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
    jest.clearAllMocks()
    bud.context.basedir = `/foo`
    bud.path = jest.fn(() => `/test-return`)
    bootstrap = subject.bind(bud)
  })

  it(`is a function`, () => {
    expect(bootstrap).toBeInstanceOf(Function)
  })

  it(`returns Bud`, async () => {
    expect(await bootstrap(context)).toBe(bud)
  })
})
