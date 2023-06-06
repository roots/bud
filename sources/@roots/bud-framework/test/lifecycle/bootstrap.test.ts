import {Bud, factory} from '@repo/test-kit'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {bootstrap as subject} from '../../src/lifecycle/bootstrap.js'

describe(`bootstrap`, function () {
  let bud: Bud
  let bootstrap: typeof subject

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
