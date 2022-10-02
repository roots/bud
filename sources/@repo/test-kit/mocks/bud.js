import {jest} from '@jest/globals'
import {dirname} from 'path'
import {fileURLToPath} from 'url'

import build from './build'
import dashboard from './dashboard'
import extensions from './extensions'
import hooks from './hooks'
import logger from './logger'

jest.unstable_mockModule(`@roots/bud-api`, async () => {
  return {
    default: jest.fn(() => ({
      logger: {},
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

const mock = jest.fn().mockImplementation(async () => {
  const api = await import(`@roots/bud-api`).then(
    ({default: Api}) => new Api(),
  )

  const build = await import(`@roots/bud-build`).then(
    ({default: Build}) => new Build(),
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
    context: {
      args: {
        dry: false,
      },
      basedir: dirname(fileURLToPath(import.meta.url)),
    },
    dashboard,
    extensions,
    hasChildren: false,
    hooks,
    json: {
      read: jest.fn(),
      write: jest.fn(),
    },
    isDevelopment: false,
    label: `MOCK`,
    logger,
    module: {
      import: jest.fn(),
      resolve: jest.fn(),
    },
    path: jest.fn(),
    success: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    fatal: jest.fn(),
  }

  bud.root = bud

  return bud
})

export default mock
