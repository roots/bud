import {factory} from '@repo/test-kit/bud'
import {Service} from '@roots/bud-framework/service'
import {beforeEach, describe, expect, it} from 'vitest'

import Bud from '../../bud/index.js'
import Project from './project.js'

describe(`@roots/bud/services/project`, () => {
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
  })

  it(`is constructable`, () => {
    expect(Project).toBeInstanceOf(Function)
  })

  it(`is a container service`, () => {
    const instance = new Project(() => bud)
    expect(instance).toBeInstanceOf(Service)
  })
})
