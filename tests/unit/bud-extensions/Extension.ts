import {Bud, factory} from '@roots/bud'
import {Extension} from '@roots/bud-extensions'
import {Module} from '@roots/bud-framework'
import {WebpackPluginInstance} from 'webpack/types'

describe('@roots/bud-extensions extension', function () {
  let bud: Bud = null

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
      foo: jest.fn(function (this: Bud) {
        return this
      }),
    })),
    options: jest.fn(app => options),
    make: jest.fn((options, app) => mockWebpackPlugin),
    when: jest.fn((app, options) => true),
  }

  beforeAll(() => {
    bud = factory()
  })

  afterAll(done => {
    bud.close(done)
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
