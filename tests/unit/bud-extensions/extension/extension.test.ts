import {beforeAll, beforeEach, describe, it, jest} from '@jest/globals'
import {factory} from '@repo/test-kit/bud'
import type {Bud} from '@roots/bud'
import {Extension} from '@roots/bud-framework/extension'

const mockInit = jest.fn()
const mockRegister = jest.fn()
const mockBoot = jest.fn()

class MockExtension extends Extension {
  public label = 'mock-extension'
  public options = {
    foo: 'bar',
    obj: {
      inner: 'value',
    },
    fn: () => 'value',
    callback: () => () => 'value',
  }

  public init: any = mockInit
  public register: any = mockRegister
  public boot: any = mockBoot
}

const resetExtensions = bud => {
  bud.extensions.repository = {}
}

describe('extension', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  beforeEach(async () => {
    resetExtensions(bud)
  })

  it('is registrable', async () => {
    await bud.extensions.add(MockExtension as any)
    expect(Object.keys(bud.extensions.repository).pop()).toBe(
      'mock-extension',
    )
  })

  it('init', async () => {
    bud.extensions.set(new MockExtension(bud) as any)
    await bud.extensions.run(bud.extensions.get('mock-extension'), '_init')
    expect(mockInit).toHaveBeenCalled()
  })

  it('register', async () => {
    bud.extensions.set(new MockExtension(bud) as any)
    await bud.extensions.run(
      bud.extensions.get('mock-extension'),
      '_register',
    )
    expect(mockRegister).toHaveBeenCalled()
  })

  it('boot', async () => {
    bud.extensions.set(new MockExtension(bud) as any)
    await bud.extensions.run(bud.extensions.get('mock-extension'), '_boot')
    expect(mockBoot).toHaveBeenCalled()
  })

  it('boot', async () => {
    bud.extensions.set(new MockExtension(bud) as any)
    await bud.extensions.run(bud.extensions.get('mock-extension'), '_boot')
    expect(mockBoot).toHaveBeenCalled()
  })

  it('options', async () => {
    bud.extensions.set(new MockExtension(bud) as any)
    expect(bud.extensions.get('mock-extension').options).toEqual(
      expect.objectContaining({
        foo: 'bar',
        obj: expect.objectContaining({
          inner: 'value',
        }),
        fn: 'value',
        callback: expect.any(Function),
      }),
    )
  })

  it('setOption', async () => {
    bud.extensions.set(new MockExtension(bud) as any)

    const instance = bud.extensions.get('mock-extension')

    // @ts-ignore
    instance.setOption('fn', 'baz')

    // @ts-ignore
    expect(instance.getOption('fn')).toBe('baz')

    expect(bud.extensions.get('mock-extension').options).toEqual(
      expect.objectContaining({
        foo: 'bar',
        obj: expect.objectContaining({
          inner: 'value',
        }),
        fn: 'baz',
        callback: expect.any(Function),
      }),
    )
  })

  it('setOptions', async () => {
    bud.extensions.set(new MockExtension(bud) as any)

    const instance = bud.extensions.get('mock-extension')

    // @ts-ignore
    instance.setOptions({changed: 'options'})
    // @ts-ignore
    expect(instance.getOption('changed')).toBe('options')

    expect(bud.extensions.get('mock-extension').options).toEqual(
      expect.objectContaining({
        changed: 'options',
      }),
    )
  })

  it('setOptions (callback)', async () => {
    bud.extensions.set(new MockExtension(bud) as any)

    const instance = bud.extensions.get('mock-extension')
    // @ts-ignore
    instance.setOptions(opts => {
      expect(opts).toEqual(
        expect.objectContaining({
          foo: 'bar',
          obj: expect.objectContaining({
            inner: 'value',
          }),
          fn: 'value',
          callback: expect.any(Function),
        }),
      )
    })
  })

  it('setOptions 2 (callback)', async () => {
    bud.extensions.set(new MockExtension(bud) as any)

    const instance = bud.extensions.get('mock-extension')
    // @ts-ignore
    instance.setOptions(opts => ({
      ...opts,
      changed: 'options',
    }))
    // @ts-ignore
    expect(instance.getOption('changed')).toBe('options')

    expect(bud.extensions.get('mock-extension').options).toEqual(
      instance.options,
    )

    expect(bud.extensions.get('mock-extension').options).toEqual(
      expect.objectContaining({
        foo: 'bar',
        obj: expect.objectContaining({
          inner: 'value',
        }),
        fn: 'value',
        callback: 'value',
        changed: 'options',
      }),
    )
  })
})
