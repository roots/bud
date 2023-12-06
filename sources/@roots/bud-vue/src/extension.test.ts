import {Bud, factory} from '@repo/test-kit'
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
    await instance.register(bud)
    expect(instance.version).toBe(`2.6.1`)
  })

  it(`should have a vue2 method that returns false when manifest has vue in range of ^3`, async () => {
    bud.context.manifest.dependencies = {vue: `^3.1.0`}
    await instance.register(bud)
    expect(instance.version).toBe(`3.1.0`)
  })

  it(`should have a version of 3 when vue is not described by the project`, async () => {
    await instance.register(bud)
    expect(instance.version).toBe(`3`)
  })

  it(`should have a runtimeOnly method modifies options.runtimeOnly`, async () => {
    instance.runtimeOnly(false)
    expect(instance.options.runtimeOnly).toBe(false)

    instance.runtimeOnly(true)
    expect(instance.options.runtimeOnly).toBe(true)

    instance.runtimeOnly(false)
    instance.runtimeOnly()
    expect(instance.options.runtimeOnly).toBe(true)
  })

  it(`should expose bud.vue interface`, async () => {
    expect(instance.app.vue).toBeInstanceOf(Vue)
  })

  it(`should register typescript support if @roots/bud-typescript is installed`, async () => {
    const bud = await factory()

    // @ts-ignore - typescript is optional
    await bud.extensions.add(`@roots/bud-typescript`)
    await bud.extensions.add(`@roots/bud-vue`)

    if (bud.extensions.configAfter) {
      await bud.extensions.configAfter(bud)
    }
    if (bud.extensions.buildBefore) {
      await bud.extensions.buildBefore(bud)
    }

    // @ts-ignore - typescript is optional
    expect(bud.typescript.get(`appendTsSuffixTo`)).toStrictEqual(
      expect.arrayContaining([/\.vue$/]),
    )
    // @ts-ignore - typescript is optional
    expect(bud.build.items.ts.getOptions().appendTsSuffixTo).toStrictEqual(
      expect.arrayContaining([/\.vue$/]),
    )
  })
})
