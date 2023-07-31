import {factory} from '@repo/test-kit'
import {Bud} from '@roots/bud'
import Project from '@roots/bud-framework/project'
import {beforeEach, describe, expect, it, vi} from 'vitest'

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
