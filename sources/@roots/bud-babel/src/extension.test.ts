import {factory} from '@repo/test-kit/bud'
import {describe, expect, it} from 'vitest'

describe(`@roots/bud-babel`, () => {
  it(`should have label`, async () => {
    const bud = await factory()
    const BabelInstance = await import(`./index.js`)
      .then(pkg => pkg.default)
      .then(async babel => new babel(bud))

    expect(BabelInstance.label).toBeDefined()
  })

  it(`should have register method`, async () => {
    const bud = await factory()
    const BabelInstance = await import(`./index.js`)
      .then(pkg => pkg.default)
      .then(async babel => new babel(bud))

    expect(BabelInstance.register).toBeDefined()
  })

  it(`should have configAfter method`, async () => {
    const bud = await factory()
    const BabelInstance = await import(`./index.js`)
      .then(pkg => pkg.default)
      .then(async babel => new babel(bud))

    expect(BabelInstance.configAfter).toBeDefined()
  })

  it(`config class has a setPlugins`, async () => {
    const bud = await factory()
    const BabelInstance = await import(`./index.js`)
      .then(pkg => pkg.default)
      .then(async babel => new babel(bud))

    expect(BabelInstance.setPlugins).toBeInstanceOf(Function)
  })

  it(`config class has a setPresets`, async () => {
    const bud = await factory()
    const BabelInstance = await import(`./index.js`)
      .then(pkg => pkg.default)
      .then(async babel => new babel(bud))

    expect(BabelInstance.setPresets).toBeInstanceOf(Function)
  })

  it(`config class has a setPlugin`, async () => {
    const bud = await factory()
    const BabelInstance = await import(`./index.js`)
      .then(pkg => pkg.default)
      .then(async babel => new babel(bud))

    expect(BabelInstance.setPlugin).toBeInstanceOf(Function)
  })

  it(`config class has a setPreset`, async () => {
    const bud = await factory()
    const BabelInstance = await import(`./index.js`)
      .then(pkg => pkg.default)
      .then(async babel => new babel(bud))

    expect(BabelInstance.setPreset).toBeInstanceOf(Function)
  })

  it(`config class has a setPluginOptions`, async () => {
    const bud = await factory()
    const BabelInstance = await import(`./index.js`)
      .then(pkg => pkg.default)
      .then(async babel => new babel(bud))

    expect(BabelInstance.setPluginOptions).toBeInstanceOf(Function)
  })

  it(`config class has a setPluginOptions`, async () => {
    const bud = await factory()
    const BabelInstance = await import(`./index.js`)
      .then(pkg => pkg.default)
      .then(async babel => new babel(bud))

    expect(BabelInstance.setPresetOptions).toBeInstanceOf(Function)
  })

  it(`bud.babel.setPresets functions`, async () => {
    const bud = await factory()
    const BabelInstance = await import(`./index.js`)
      .then(pkg => pkg.default)
      .then(async babel => new babel(bud))

    BabelInstance.presets = {}

    const value: Record<string, [string, any]> = {
      '@babel/preset-env': [`@babel/preset-env`, {foo: `bar`}],
    }
    BabelInstance.setPresets(value)

    expect(BabelInstance.presets).toEqual(value)
  })

  it(`bud.babel.setPreset functions`, async () => {
    const bud = await factory()
    const BabelInstance = await import(`./index.js`)
      .then(pkg => pkg.default)
      .then(async babel => new babel(bud))

    BabelInstance.presets = {}

    BabelInstance.setPreset(`@babel/preset-env`, `@babel/preset-env`)

    expect(BabelInstance.presets).toEqual({
      '@babel/preset-env': [`@babel/preset-env`],
    })

    BabelInstance.presets = {}

    BabelInstance.setPreset(`@babel/preset-env`, [
      `@babel/preset-env`,
      {foo: `bar`},
    ])

    expect(BabelInstance.presets).toEqual({
      '@babel/preset-env': [`@babel/preset-env`, {foo: `bar`}],
    })
  })

  it(`bud.babel.setPlugin functions`, async () => {
    const bud = await factory()
    const BabelInstance = await import(`./index.js`)
      .then(pkg => pkg.default)
      .then(async babel => new babel(bud))

    BabelInstance.plugins = {}

    BabelInstance.setPlugin(`someBabelPlugin`, `someBabelPlugin`)

    expect(BabelInstance.plugins).toEqual({
      someBabelPlugin: [`someBabelPlugin`],
    })

    BabelInstance.plugins = {}

    BabelInstance.setPlugin(`someBabelPlugin`, [
      `someBabelPlugin`,
      {foo: `bar`},
    ])

    expect(BabelInstance.plugins).toEqual({
      someBabelPlugin: [`someBabelPlugin`, {foo: `bar`}],
    })
  })

  it(`bud.babel.unsetPlugin functions`, async () => {
    const bud = await factory()
    const BabelInstance = await import(`./index.js`)
      .then(pkg => pkg.default)
      .then(async babel => new babel(bud))

    BabelInstance.plugins = {
      someBabelPlugin: [`someBabelPlugin`],
    }

    BabelInstance.unsetPlugin(`someBabelPlugin`)

    expect(BabelInstance.plugins).toEqual({})
  })

  it(`bud.babel.unsetPreset functions`, async () => {
    const bud = await factory()
    const BabelInstance = await import(`./index.js`)
      .then(pkg => pkg.default)
      .then(async babel => new babel(bud))

    BabelInstance.presets = {
      someBabelPreset: [`someBabelPreset`],
    }

    BabelInstance.unsetPreset(`someBabelPreset`)

    expect(BabelInstance.presets).toEqual({})
  })

  it(`should have a setEnv method`, async () => {
    const bud = await factory()
    const BabelInstance = await import(`./index.js`)
      .then(pkg => pkg.default)
      .then(async babel => new babel(bud))

    expect(BabelInstance.setEnv)
  })

  it(`should have a setEnv method`, async () => {
    const bud = await factory()
    const BabelInstance = await import(`./index.js`)
      .then(pkg => pkg.default)
      .then(async babel => new babel(bud))

    expect(BabelInstance.setEnv)
  })
})
