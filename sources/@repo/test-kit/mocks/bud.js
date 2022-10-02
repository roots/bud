import {jest} from '@jest/globals'

import build from './build'
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

  const extensions = await import(`@roots/bud-extensions`).then(
    ({default: Extensions}) => new Extensions(),
  )

  const hooks = await import(`@roots/bud-hooks`).then(
    ({default: Hooks}) => new Hooks(),
  )

  const bud = {
    api,
    build,
    extensions,
    hooks,
    logger,
    path: jest.fn(),
  }

  return bud
})

export default mock
