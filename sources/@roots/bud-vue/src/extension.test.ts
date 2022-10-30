import {beforeEach, describe, expect, it} from '@jest/globals'
import {factory} from '@repo/test-kit/bud'

import Extension from './index'

describe(`@roots/bud-vue`, () => {
  let bud
  let instance

  beforeEach(async () => {
    bud = await factory()
    bud.extensions.repository = {}
    await bud.extensions.add(Extension)
    instance = new Extension(bud)
  })

  it(`should be a constructor`, () => {
    expect(Extension).toBeInstanceOf(Function)
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
