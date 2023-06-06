import logger from '@roots/bud-support/logger'
import * as repo from '@repo/constants'
import {type Bud, factory, mockProject} from '@repo/test-kit'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`mock project`, () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it(`repoPath matches repo root`, async () => {
    expect(repo.path(`tests/unit/tests`)).toEqual(
      expect.stringContaining(`tests/unit/tests`),
    )
  })

  it(`mockProject.path matches project path`, async () => {
    expect(mockProject.path).toBe(repo.path(`tests/util/project`))
  })

  it(`has the expected context`, async () => {
    logger.log(`mock path`, mockProject.path)
    expect(bud.context.basedir).toBe(mockProject.path)
  })

  it(`has the expected env`, async () => {
    logger.log(`mock path`, mockProject.path)
    expect(bud.context.basedir).toBe(mockProject.path)
  })
})
