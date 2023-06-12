import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'

import {beforeAll, describe, test} from 'vitest'

describe(`@roots/bud-framework/extension`, () => {
  let extension: Extension
  let bud: Bud = {} as Bud

  beforeAll(async () => {
    extension = new (class extends Extension {})(bud)
  })
  test(`done`, async ({expect}) => {
    expect(extension.done()).toBe(bud)
  })
})
