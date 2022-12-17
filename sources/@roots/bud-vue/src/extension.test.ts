import {Bud, factory} from '@repo/test-kit/bud'
import {Extension} from '@roots/bud-framework/extension'
import {beforeEach, describe, expect, it} from 'vitest'

import Vue from './index.js'

describe(`@roots/bud-vue`, () => {
  let bud: Bud
  let instance: Vue

  beforeEach(async () => {
    bud = await factory()
    instance = new Vue(bud)
  })

  it(`should be constructable`, () => {
    expect(instance).toBeInstanceOf(Extension)
  })

  it(`should be constructable`, () => {
    expect(instance).toBeInstanceOf(Extension)
  })

  it(`should have a vue2 method that returns true when manifest has vue in range of ^2`, async () => {
    bud.context.manifest.dependencies = {vue: `^2.6.1`}
    expect(await instance.isVue2(bud)).toBe(true)
    expect(instance.version).toBe(`2.6.1`)
  })

  it(`should have a vue2 method that returns false when manifest has vue in range of ^3`, async () => {
    bud.context.manifest.dependencies = {vue: `^3.1.0`}
    expect(await instance.isVue2(bud)).toBe(false)
    expect(instance.version).toBe(`3.1.0`)
  })

  it(`should have a vue2 method that returns false when vue is resolvable but not listed in manifest`, async () => {
    expect(await instance.isVue2(bud)).toBe(false)
    expect(instance.version).toMatch(/3\..*\..*/)
  })
})
