import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {bootstrap as subject} from './bootstrap.js'

describe(`bootstrap`, function () {
  let bud
  let bootstrap

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory()
    bud.context.basedir = `/foo`
    bud.path = vi.fn(() => `/test-return`)
    bootstrap = subject.bind(bud)
  })

  it(`is a function`, () => {
    expect(bootstrap).toBeInstanceOf(Function)
  })
})
