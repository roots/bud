import {path} from '@repo/constants'
import {factory} from '@repo/test-kit'
import {describe, expect, it} from 'vitest'

import {bootstrap} from '../src/bootstrap/index.js'
import {Bud} from '../src/bud/index.js'

describe(`bootstrap`, {retry: 2}, function () {
  it(`is a function`, () => {
    expect(bootstrap).toBeInstanceOf(Function)
  })

  it(`returns Bud`, async () => {
    const value = await bootstrap(
      await factory({
        basedir: path(`tests/util/project`),
        dry: true,
      }),
    )
    expect(value.constructor.name).toEqual(`Bud`)
  })

  it(`should call methods`, async () => {
    const value = await bootstrap(
      await factory({
        basedir: path(`tests/util/project`),
        dry: true,
      }),
    )
    expect(value.context.dry).toBe(true)
    expect(value.context.basedir).toBe(path(`tests/util/project`))
  })

  it(`child instances should reference bud.root.module`, async () => {
    const root = await factory({
      basedir: path(`tests/util/project`),
      dry: true,
    })
    await root.make(`foo`)
    const child = root.get(`foo`)

    const value = await bootstrap(child)
    expect(value.isRoot).toBe(false)
    expect(value.module).toBe(root.module)
  })
})
