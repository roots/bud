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
    bud = await factory()
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

  it('register fn returns self', () => {
    const controller: Controller = new Controller(
      bud,
      mockModule,
    )
    controller.register()

    expect(controller.register()).toBeInstanceOf(Controller)
  })

  it('calls module register fn', () => {
    const controller: Controller = new Controller(
      bud,
      mockModule,
    )
    controller.register()

    expect(controller.module.register).toHaveBeenCalled()
  })

  it('calls module boot fn', () => {
    const controller: Controller = new Controller(
      bud,
      mockModule,
    )
    controller.boot()

    expect(controller.module.boot).toHaveBeenCalled()
  })

  it('returns expected unique id', () => {
    const controller: Controller = new Controller(
      bud,
      mockModule,
    )

    expect(controller.makeKey('options')).toEqual(
      'extension/@roots/bud-postcss/options',
    )
  })

  it('set fn returns expected value', () => {
    const controller: Controller = new Controller(
      bud,
      mockModule,
    )
    controller.set('options', {foo: 'bap'})

    expect(controller.options).toEqual({foo: 'bap'})
  })

  it('get fn returns expected value', () => {
    const controller: Controller = new Controller(
      bud,
      mockModule,
    )
    controller.options = {foo: 'baz'}

    expect(controller.get('options')).toEqual({foo: 'baz'})
  })

  it('module options are registered', () => {
    bud.use(mockModule)

    expect(
      bud.extensions.get('@roots/bud-postcss').get('options')(
        bud,
      ),
    ).toEqual(options)

    expect(
      bud.extensions.get('@roots/bud-postcss').options,
    ).toEqual(options)
  })

  it('Controller options are undefined when not set in module', () => {
    const controller = new Controller(bud, {
      name: '@roots/bud-null',
    })

    expect(controller.options).toEqual(undefined)
  })

  it('controller.make returns webpack plugin', () => {
    const controller = new Controller(bud, mockModule)

    expect(controller.make).toBe(mockWebpackPlugin)
  })
})
