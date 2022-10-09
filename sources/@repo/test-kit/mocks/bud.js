import {jest} from '@jest/globals'

import build from './build'
import cache from './cache'
import dashboard from './dashboard'
import extensions from './extensions'
import hooks from './hooks'
import logger from './logger'

jest.unstable_mockModule(`@roots/bud-api`, async () => {
  return {
    default: jest.fn(() => ({
      logger: {
        success: jest.fn(),
      },
    })),
  }
})
jest.unstable_mockModule(`@roots/bud-build`, () => ({default: build}))
jest.unstable_mockModule(`@roots/bud-dashboard`, () => ({
  default: dashboard,
}))
jest.unstable_mockModule(`@roots/bud-extensions`, () => ({
  default: extensions,
}))
jest.unstable_mockModule(`@roots/bud-hooks`, () => ({default: hooks}))
jest.unstable_mockModule(`@roots/bud-cache`, () => ({default: cache}))

const mock = jest.fn().mockImplementation(async () => {
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
    fs: {
      json: {
        read: jest.fn(),
        write: jest.fn(),
        parse: jest.fn(),
        stringify: jest.fn(),
      },
      yml: {
        read: jest.fn(),
        write: jest.fn(),
        parse: jest.fn(),
      },
    },
    hasChildren: false,
    hooks,
    json: {
      read: jest.fn(),
      write: jest.fn(),
    },
    isDevelopment: false,
    label: `MOCK`,
    logger,
    maybeCall: jest.fn(),
    module: {
      import: jest.fn(),
      resolve: jest.fn(),
    },
    path: jest.fn(),
    run: jest.fn(),
    setPath: jest.fn(),
    success: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    fatal: jest.fn(),
    env: {
      get: jest.fn(),
      set: jest.fn(),
      isString: jest.fn(() => true),
    },
  }

  bud.root = bud

  return bud
})

export default mock
