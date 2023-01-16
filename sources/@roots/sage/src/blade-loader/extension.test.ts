import {Bud, factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {BladeLoaderExtension} from './extension.js'

describe(`@roots/sage/blade-loader`, () => {
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
  })

  it(`should be constructable`, () => {
    expect(BladeLoaderExtension).toBeInstanceOf(Function)
  })
})
