import {log} from '@repo/logger'
import {Bud, factory} from '@repo/test-kit/bud'
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

  public init = mockInit
  public register = mockRegister
  public boot = mockBoot
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
    await bud.extensions.add(MockExtension)
    expect(Object.keys(bud.extensions.repository).pop()).toBe(
      'mock-extension',
    )
  })

  it('init', async () => {
    bud.extensions.set(new MockExtension(bud))
    await bud.extensions.run(bud.extensions.get('mock-extension'), '_init')
    expect(mockInit).toHaveBeenCalled()
  })

  it('register', async () => {
    bud.extensions.set(new MockExtension(bud))
    await bud.extensions.run(
      bud.extensions.get('mock-extension'),
      '_register',
    )
    expect(mockRegister).toHaveBeenCalled()
  })

  it('boot', async () => {
    bud.extensions.set(new MockExtension(bud))
    await bud.extensions.run(bud.extensions.get('mock-extension'), '_boot')
    expect(mockBoot).toHaveBeenCalled()
  })

  it('boot', async () => {
    bud.extensions.set(new MockExtension(bud))
    await bud.extensions.run(bud.extensions.get('mock-extension'), '_boot')
    expect(mockBoot).toHaveBeenCalled()
  })

  it('options', async () => {
    bud.extensions.set(new MockExtension(bud))
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
    bud.extensions.set(new MockExtension(bud))

    const instance = bud.extensions.get('mock-extension')

    instance.setOption('fn', 'baz')

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
    bud.extensions.set(new MockExtension(bud))

    const instance = bud.extensions.get('mock-extension')

    instance.setOptions({changed: 'options'})

    expect(instance.getOption('changed')).toBe('options')

    expect(bud.extensions.get('mock-extension').options).toEqual(
      expect.objectContaining({
        changed: 'options',
      }),
    )
  })

  it('setOptions (callback)', async () => {
    bud.extensions.set(new MockExtension(bud))

    const instance = bud.extensions.get('mock-extension')

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
    bud.extensions.set(new MockExtension(bud))

    const instance = bud.extensions.get('mock-extension')

    instance.setOptions(opts => ({
      ...opts,
      changed: 'options',
    }))

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
