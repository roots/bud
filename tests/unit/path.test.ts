import {join} from 'node:path'
import {path} from '@repo/constants'
import {Bud, factory} from '@repo/test-kit'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`bud.path`, function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it(`path: is a function`, () => {
    expect(bud.path).toBeInstanceOf(Function)
  })

  it(`returns projectDir when nothing passed`, () => {
    expect(bud.path()).toEqual(path(`tests`, `util`, `project`))
  })

  it(`returns expected project relative path`, () => {
    expect(bud.path(`./foo`)).toEqual(
      path(`tests`, `util`, `project`, `foo`),
    )
  })
  it(`returns expected multipart path`, () => {
    expect(bud.path(`./foo`, `bar`)).toEqual(
      path(`tests`, `util`, `project`, `foo`, `bar`),
    )
  })
})
