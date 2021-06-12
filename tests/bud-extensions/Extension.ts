import {Extension, Module} from '@roots/bud-extensions'
import {WebpackPluginInstance} from 'webpack/types'
import {Framework, setupBud, teardownBud} from '../util'

describe('@roots/bud-extensions extension', function () {
  let bud: Framework = null

  let mockWebpackPlugin: WebpackPluginInstance = {
    apply: jest.fn(),
  }

  let options = {
    test: 'foo',
  }

  let mockModule: Module = {
    name: '@roots/bud-postcss',
    register: jest.fn(app => null),
    boot: jest.fn(app => null),
    api: jest.fn(app => ({
      foo: jest.fn(function (this: Framework) {
        return this
      }),
    })),
    options: jest.fn(app => options),
    make: jest.fn((options, app) => mockWebpackPlugin),
    when: jest.fn((app, options) => true),
  }

  beforeAll(() => {
    bud = setupBud()
  })

  afterAll(() => {
    bud = teardownBud(bud)
  })

  it('is constructable', () => {
    const extension: Extension = new Extension(bud, mockModule)
    expect(extension).toBeInstanceOf(Extension)
  })

  it('register fn returns self', () => {
    const extension: Extension = new Extension(bud, mockModule)
    extension.register()

    expect(extension.register()).toBeInstanceOf(Extension)
  })

  it('calls module register fn', () => {
    const extension: Extension = new Extension(bud, mockModule)
    extension.register()

    expect(extension.module.register).toHaveBeenCalled()
  })

  it('calls module boot fn', () => {
    const extension: Extension = new Extension(bud, mockModule)
    extension.boot()

    expect(extension.module.boot).toHaveBeenCalled()
  })

  it('returns expected unique id', () => {
    const extension: Extension = new Extension(bud, mockModule)

    expect(extension.makeKey('options')).toEqual(
      'extension/@roots/bud-postcss/options',
    )
  })

  it('set fn returns expected value', () => {
    const extension: Extension = new Extension(bud, mockModule)
    extension.set('options', {foo: 'bap'})

    expect(extension.options).toEqual({foo: 'bap'})
  })

  it('get fn returns expected value', () => {
    const extension: Extension = new Extension(bud, mockModule)
    extension.options = {foo: 'baz'}

    expect(extension.get('options')).toEqual({foo: 'baz'})
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

  it('extension options are undefined when not set in module', () => {
    const extension = new Extension(bud, {
      name: '@roots/bud-null',
    })

    expect(extension.options).toEqual(undefined)
  })

  it('extension.make returns webpack plugin', () => {
    const extension = new Extension(bud, mockModule)

    expect(extension.make).toBe(mockWebpackPlugin)
  })
})

/*

  @bind
  public get(key: Key) {
    const hook = this.makeKey(key)
    const value = this.app.hooks.filter(hook)
    return value
  }

  @bind
  public set(key: Key, value: any) {
    this.app.hooks.on(this.makeKey(key), value)
  }

  public get module(): Module {
    return this.app.access(this._module)
  }

  public get app(): Framework {
    return this._app()
  }

  public get logger() {
    return this.app.extensions.logger
  }

  public get name(): keyof Framework.Extensions {
    return this.module.name
  }

  public get options() {
    this.logger.log('get options', this)
    return this.app.access(this.get('options'))
  }

  public set options(options: Module['options']) {
    this.set('options', options)
  }

  public get when() {
    if (_.isFunction(this.get('when'))) {
      return this.get('when')(
        this.app,
        this.app.container(this.options),
      )
    }

    return this.get('when')
  }

  public set when(when: Module['when']) {
    this.set('when', when)
  }

  public get make() {
    if (this.when == false) {
      this.logger.debug({
        message: `not set for inclusion. skipping.`,
      })

      return
    }

    if (!this.get('make')) {
      return
    }

    if (_.isFunction(this.get('make'))) {
      return this.get('make')(
        this.options
          ? this.app.container(this.options)
          : this.app.container({}),
        this.app,
      )
    }

    return this.get('make')
  }

  public set make(make: Module.Make) {
    this.set('make', make)
  }
 */
