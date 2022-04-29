import {Bud, factory} from '@repo/test-kit/bud'
import {Extension} from '@roots/bud-framework/extension'

const mockInit = jest.fn()
const mockRegister = jest.fn()
const mockBoot = jest.fn()

class MockExtension extends Extension {
  public label = 'mock-extension'
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

  it('can be registered', async () => {
    await bud.extensions.add(MockExtension)
    expect(Object.keys(bud.extensions.repository).pop()).toBe(
      'mock-extension',
    )
  })

  it('init method is callable', async () => {
    bud.extensions.set(new MockExtension(bud))
    await bud.extensions.run(bud.extensions.get('mock-extension'), '_init')
    expect(mockInit).toHaveBeenCalled()
  })

  it('register method is callable', async () => {
    bud.extensions.set(new MockExtension(bud))
    await bud.extensions.run(
      bud.extensions.get('mock-extension'),
      '_register',
    )
    expect(mockRegister).toHaveBeenCalled()
  })

  it('boot method is callable', async () => {
    bud.extensions.set(new MockExtension(bud))
    await bud.extensions.run(bud.extensions.get('mock-extension'), '_boot')
    expect(mockBoot).toHaveBeenCalled()
  })

  it('boot method is callable', async () => {
    bud.extensions.set(new MockExtension(bud))
    await bud.extensions.run(bud.extensions.get('mock-extension'), '_boot')
    expect(mockBoot).toHaveBeenCalled()
  })
})
