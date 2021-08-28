import {factory, Framework} from '@roots/bud'
import {Extensions, Module} from '@roots/bud-extensions'
import {WebpackPluginInstance} from 'webpack'

describe('Extensions', function () {
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
    bud = factory()
  })

  afterAll(done => {
    bud.close(done)
  })

  it('is constructable', () => {
    const extensions: Extensions = new Extensions(bud)
    expect(extensions).toBeInstanceOf(Extensions)
  })

  it('add fn registers a module', () => {
    const extensions: Extensions = new Extensions(bud)
    extensions.repository = {} as Framework.Extensions

    extensions.add(mockModule)

    expect(extensions.get(mockModule.name).module).toBe(
      mockModule,
    )
  })

  it('getEligibleWebpackModules returns webpack plugins to be used in compilation', () => {
    const extensions: Extensions = new Extensions(bud)
    extensions.repository = {} as Framework.Extensions

    extensions.add(mockModule)

    expect(
      extensions.getEligibleWebpackModules().pop().module,
    ).toBe(mockModule)
  })
})
