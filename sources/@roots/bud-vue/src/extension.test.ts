import {factory} from '@roots/bud/factory'
import {Extension} from '@roots/bud-framework/extension'
import {beforeEach, describe, expect, it} from 'vitest'

import Vue from './index'

describe(`@roots/bud-vue`, () => {
  let bud
  let vue

  beforeEach(async () => {
    bud = await factory()
    vue = new Vue(bud)
  })

  it(`should be constructable`, () => {
    expect(vue).toBeInstanceOf(Extension)
  })
})
