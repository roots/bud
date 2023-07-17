import {path} from '@repo/constants'
import {type Bud, factory} from '@repo/test-kit'
import logger from '@roots/bud-support/logger'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`mock project`, () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it(`repoPath matches repo root`, async () => {
    expect(path(`tests/unit/tests`)).toEqual(
      expect.stringContaining(`tests/unit/tests`),
    )
  })

  it(`bud.path() matches project path`, async () => {
    expect(bud.path()).toBe(path(`tests/util/project`))
  })

  it(`has the expected context`, async () => {
    logger.log(`mock path`, bud.path())
    expect(bud.context.basedir).toBe(bud.path())
  })

  it(`has the expected env`, async () => {
    logger.log(`mock path`, bud.path())
    expect(bud.context.basedir).toBe(bud.path())
  })
})
