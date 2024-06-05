import {factory} from '@repo/test-kit'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {Bud} from '../src/index.js'
import Project from '../src/project/index.js'

describe(`@roots/bud/services/project`, () => {
  let bud: Bud
  let project: Project

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory()
    project = new Project(() => bud)
  })

  it(`returns early if debug not set`, async () => {
    bud.context.debug = false
    const pathSpy = vi.spyOn(bud, `path`)

    if (!project.buildAfter) return

    await project.buildAfter(bud)

    expect(pathSpy).not.toHaveBeenCalled()
  })
})
