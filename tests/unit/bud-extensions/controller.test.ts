import {Bud, factory} from '@repo/test-kit/bud'
import {Controller} from '@roots/bud-extensions'
import {Extension} from '@roots/bud-framework/extension'
import {WebpackPluginInstance} from 'webpack'

describe('@roots/bud-extensions Controller', function () {
  let bud: Bud

  let mockWebpackPlugin: WebpackPluginInstance = {
    apply: jest.fn(),
  }

  let options = {test: 'foo'}

  let mockModule: Extension = {
    label: '@roots/bud-postcss',
    register: jest.fn(async (options, app) => {
      app.api.bindFacade(
        'foo',
        jest.fn(async function (this: Bud) {
          return this
        }),
      )
    }),
    boot: jest.fn(async () => null),
    options: jest.fn(() => options),
    make: jest.fn(async () => mockWebpackPlugin),
    when: jest.fn(async () => true),
  }

  beforeAll(async () => {
    bud = await factory()
  })

  it('is constructable', () => {
    const controller: Controller = new Controller(bud).setModule(
      mockModule,
    )
    expect(controller).toBeInstanceOf(Controller)
  })

  it('register fn returns self', async () => {
    const controller: Controller = new Controller(bud).setModule(
      mockModule,
    )
    const registerReturn = await controller.register()

    expect(registerReturn).toBeInstanceOf(Controller)
  })

  it('calls module register fn', async () => {
    const controller: Controller = new Controller(bud).setModule(
      mockModule,
    )
    await controller.register()

    expect(controller.module.register).toHaveBeenCalled()
  })

  it('calls module boot fn', async () => {
    const controller: Controller = new Controller(bud).setModule(
      mockModule,
    )
    await controller.boot()

    expect(controller.module.boot).toHaveBeenCalled()
  })

  it('module options are registered', async () => {
    await bud.extensions.add(mockModule)

    expect(
      bud.extensions.get('@roots/bud-postcss').module.options,
    ).toBeInstanceOf(Object)
  })

  it('options are auto set when not set in module', () => {
    const controller = new Controller(bud).setModule({
      label: '@roots/bud-null',
    })
    expect(controller.get('options')).toStrictEqual({})
  })

  it('controller.make returns webpack plugin', async () => {
    const controller = new Controller(bud).setModule(mockModule)
    const result = await controller.make()
    expect(result).toBe(mockWebpackPlugin)
  })

  it('controller.api', async () => {
    const controller = new Controller(bud).setModule(mockModule)
    await controller.register()

    // @ts-ignore
    expect(bud.foo).toBeInstanceOf(Function)

    // @ts-ignore
    const result = await bud.api.call('foo')
    expect(result).toBeInstanceOf(Bud)
  })
})
