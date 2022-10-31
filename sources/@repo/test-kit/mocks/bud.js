import {vi} from 'vitest'

import build from './build'
import cache from './cache'
import dashboard from './dashboard'
import extensions from './extensions'
import hooks from './hooks'
import logger from './logger'

vi.mock(`@roots/bud-api`, async () => {
  return {
    default: vi.fn(() => ({
      logger: {
        success: vi.fn(),
      },
      trace: [],
    })),
  }
})
vi.mock(`@roots/bud-build`, () => ({default: build}))
vi.mock(`@roots/bud-dashboard`, () => ({
  default: dashboard,
}))
vi.mock(`@roots/bud-extensions`, () => ({
  default: extensions,
}))
vi.mock(`@roots/bud-hooks`, () => ({default: hooks}))
vi.mock(`@roots/bud-cache`, () => ({default: cache}))

const mock = vi.fn().mockImplementation(async () => {
  const api = await import(`@roots/bud-api`).then(
    ({default: Api}) => new Api(),
  )

  const build = await import(`@roots/bud-build`).then(
    ({default: Build}) => new Build(),
  )

  const cache = await import(`@roots/bud-cache`).then(
    ({default: Cache}) => new Cache(),
  )

  const context = await import(`./context.js`).then(
    ({default: context}) => context,
  )

  const dashboard = await import(`@roots/bud-dashboard`).then(
    ({default: Dashboard}) => new Dashboard(),
  )

  const extensions = await import(`@roots/bud-extensions`).then(
    ({default: Extensions}) => new Extensions(),
  )

  const hooks = await import(`@roots/bud-hooks`).then(
    ({default: Hooks}) => new Hooks(),
  )

  const bud = {
    api,
    build,
    cache,
    context,
    dashboard,
    extensions,
    proxy: vi.fn(),
    fs: {
      exists: vi.fn(),
      json: {
        read: vi.fn(),
        write: vi.fn(),
        parse: vi.fn(),
        stringify: vi.fn(),
      },
      yml: {
        read: vi.fn(),
        write: vi.fn(),
        parse: vi.fn(),
      },
    },
    hasChildren: false,
    hooks,
    json: {
      read: vi.fn(),
      write: vi.fn(),
    },
    isDevelopment: false,
    label: `MOCK`,
    logger,
    maybeCall: vi.fn(),
    module: {
      import: vi.fn(),
      resolve: vi.fn(),
    },
    path: vi.fn(),
    run: vi.fn(),
    setPath: vi.fn(),
    success: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    fatal: vi.fn(),
    env: {
      get: vi.fn(),
      set: vi.fn(),
      isString: vi.fn(() => true),
    },
  }

  bud.root = bud

  return bud
})

export default mock
