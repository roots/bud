import {Bud, factory} from '@roots/bud'
import {Controller} from '@roots/bud-extensions'
import {Extension} from '@roots/bud-framework'
import {WebpackPluginInstance} from 'webpack/types'

describe('@roots/bud-extensions Controller', function () {
  let bud: Bud = null

  let mockWebpackPlugin: WebpackPluginInstance = {
    apply: jest.fn(),
  }

  let options = {
    test: 'foo',
  }

  let mockModule: Extension.Module = {
    name: '@roots/bud-postcss',
    register: jest.fn(app => null),
    boot: jest.fn(app => null),
    api: jest.fn(app => ({
      foo: jest.fn(function (this: Bud) {
        return this
      }),
    })),
    options: jest.fn(app => options),
    make: jest.fn((options, app) => mockWebpackPlugin),
    when: jest.fn((app, options) => true),
  }

  beforeAll(async () => {
    bud = await factory({
      config: {ci: true, log: false},
    })
  })

  afterAll(done => {
    bud.close(done)
  })

  it('is constructable', () => {
    const controller: Controller = new Controller(
      bud,
      mockModule,
    )

    expect(controller).toBeInstanceOf(Controller)
  })

  it('register fn returns self', async () => {
    const controller: Controller = new Controller(
      bud,
      mockModule,
    )
    const registerReturn = await controller.register()

    expect(registerReturn).toBeInstanceOf(Controller)
  })

  it('calls module register fn', async () => {
    const controller: Controller = new Controller(
      bud,
      mockModule,
    )
    await controller.register()

    expect(controller.module.register).toHaveBeenCalled()
  })

  it('calls module boot fn', async () => {
    const controller: Controller = new Controller(
      bud,
      mockModule,
    )
    await controller.boot()

    expect(controller.module.boot).toHaveBeenCalled()
  })

  it('module options are registered', () => {
    bud.use(mockModule)

    expect(
      bud.extensions.get('@roots/bud-postcss').get('options'),
    ).toBeInstanceOf(Object)
  })

  it('Controller options are undefined when not set in module', () => {
    const controller = new Controller(bud, {
      name: '@roots/bud-null',
    })

    expect(controller.options.all()).toEqual({})
  })

  it('controller.make returns webpack plugin', () => {
    const controller = new Controller(bud, mockModule)

    expect(controller.make()).toBe(mockWebpackPlugin)
  })
})
