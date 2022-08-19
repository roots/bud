import {beforeAll, describe, expect, it} from '@jest/globals'
import * as console from '@repo/logger'
import {Bud, factory, mockProject, repoPath} from '@repo/test-kit/bud'

describe(`mock project`, () => {
  let bud: Bud

  beforeAll(async () => (bud = await factory()))

  it(`repoPath matches repo root`, async () => {
    expect(repoPath(`tests/unit/tests`)).toEqual(
      expect.stringContaining(`tests/unit/tests`),
    )
  })

  it(`mockProject.path matches project path`, async () => {
    expect(mockProject.path).toBe(repoPath(`tests/util/project`))
  })

  it(`has the expected context`, async () => {
    console.log(`mock path`, mockProject.path)
    expect(bud.context.basedir).toBe(mockProject.path)
  })

  it(`has the expected env`, async () => {
    console.log(`mock path`, mockProject.path)
    expect(bud.context.basedir).toBe(mockProject.path)
  })
})
