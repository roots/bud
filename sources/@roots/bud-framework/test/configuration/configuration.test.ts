import {parse} from 'node:path'

import {Bud, factory} from '@repo/test-kit'
import {BudError} from '@roots/bud-support/errors'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import Configuration from '../../src/configuration/index.js'
import {File} from '../../src/context/index.js'

const testFileDescription: File = {
  bud: false,
  ext: `.js`,
  local: false,
  mode: 0,
  // @ts-ignore intentionally invalid
  module: undefined,
  name: `test.config`,
  parsed: parse(`foo/test.config.js`),
  path: `foo/test.config.js`,
  sha1: `abcdefg`,
  size: 0,
  target: `base`,
  type: `module`,
}

describe(`@roots/bud-framework/configuration`, function () {
  let configuration: Configuration
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
    configuration = new Configuration(bud)
  })

  it(`is constructable`, () => {
    expect(configuration).toBeInstanceOf(Configuration)
  })

  it(`has a run method`, async () => {
    expect(configuration.run).toBeInstanceOf(Function)
  })

  it(`throws when there is no module`, async () => {
    let error: BudError | undefined

    await configuration.run(testFileDescription).catch(thrown => {
      error = thrown
    })

    expect(error).toBeInstanceOf(BudError)
    expect(error).toMatchInlineSnapshot(
      `[BudError: No module found: test.config.js]`,
    )
  })
})
