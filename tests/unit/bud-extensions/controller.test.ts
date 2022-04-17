import {Bud, factory} from '@repo/test-kit/bud'
import {Controller} from '@roots/bud-extensions'
import {Extension} from '@roots/bud-framework'
import {WebpackPluginInstance} from 'webpack'

describe('@roots/bud-extensions Controller', function () {
  let bud: Bud

  let mockWebpackPlugin: WebpackPluginInstance = {
    apply: jest.fn(),
  }

  let options = {test: 'foo'}

  let mockModule: Extension.Module = {
    label: '@roots/bud-postcss',
    register: jest.fn(async app => {
      app.api.bindFacade(
        'foo',
        jest.fn(async function (this: Bud) {
          return this
        }),
      )
    }),
    boot: jest.fn(() => null),
    options: jest.fn(() => options),
    make: jest.fn(() => mockWebpackPlugin),
    when: jest.fn(() => true),
  }

  beforeAll(async () => {
    bud = await factory()
  })

  it('is constructable', () => {
    const controller: Controller = new Controller(bud, mockModule)

    expect(controller).toBeInstanceOf(Controller)
  })

  it('register fn returns self', async () => {
    const controller: Controller = new Controller(bud, mockModule)
    const registerReturn = await controller.register()

    expect(registerReturn).toBeInstanceOf(Controller)
  })

  it('calls module register fn', async () => {
    const controller: Controller = new Controller(bud, mockModule)
    await controller.register()

    expect(controller._module.register).toHaveBeenCalled()
  })

  it('calls module boot fn', async () => {
    const controller: Controller = new Controller(bud, mockModule)
    await controller.boot()

    expect(controller._module.boot).toHaveBeenCalled()
  })

  it('module options are registered', async () => {
    await bud.extensions.add(mockModule)

    expect(
      bud.extensions.get('@roots/bud-postcss').options.all(),
    ).toBeInstanceOf(Object)
  })

  it('Controller options are undefined when not set in module', () => {
    const controller = new Controller(bud, {label: '@roots/bud-null'})
    expect(controller.options.all()).toEqual({})
  })

  it('controller.make returns webpack plugin', () => {
    const controller = new Controller(bud, mockModule)

    expect(controller.make()).toBe(mockWebpackPlugin)
  })

  it('controller.api', async () => {
    const controller = new Controller(bud, mockModule)
    await controller.register()

    // @ts-ignore
    expect(bud.foo).toBeInstanceOf(Function)

    // @ts-ignore
    const result = await bud.api.call('foo')
    expect(result).toBeInstanceOf(Bud)
  })
})
