import {parse} from 'node:path'

import {Bud, factory} from '@repo/test-kit'
import {BudError} from '@roots/bud-support/errors'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import Configuration from '../../src/configuration/index.js'
import {File} from '../../src/context.js'
import '../../src/index.js'

const testFileDescription: File = {
  bud: false,
  local: false,
  mode: 0,
  // @ts-ignore intentionally invalid
  module: undefined,
  name: `test.config.js`,
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

  it(`has a run method`, async () => {
    expect(configuration.bud).toBe(bud)
  })

  it(`throws when there is no module`, async () => {
    let error
    await configuration
      .run(testFileDescription)
      .catch(e => {
        error = e
      })
      .finally(() => {
        expect(error).toBeInstanceOf(BudError)
      })
  })
})
