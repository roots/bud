import {factory, Framework} from '@roots/bud'
import * as imagemin from '@roots/bud-imagemin'

const EXTENSION_HANDLE = '@roots/bud-imagemin'
const PLUGIN_HANDLE = 'image-minimizer-webpack-plugin'

describe('@roots/bud-imagemin', () => {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory({config: {ci: true, log: false}})
  })

  afterAll(done => {
    bud.close(done)
  })

  it('is registered', () => {
    bud.use([imagemin])

    expect(imagemin).toEqual(
      bud.extensions.get(EXTENSION_HANDLE).module,
    )
  })

  it('exports and registers a bud webpack plugin interface', () => {
    bud.use(imagemin)
    const controller = bud.extensions.get(PLUGIN_HANDLE)

    expect(controller.module.name).toBe(
      'image-minimizer-webpack-plugin',
    )
    expect(controller.module.make).toBeInstanceOf(Function)
    expect(controller.module.when).toBeInstanceOf(Function)
    expect(controller.module.when).toBeInstanceOf(Function)
    expect(controller.module.options).toBeInstanceOf(Object)
  })

  it('is used when there are imagemin plugins registered', () => {
    bud.minimize().use(imagemin)

    const registered = bud.extensions.get(
      'image-minimizer-webpack-plugin',
    )

    expect(registered.when).toEqual(true)
  })

  it('has name prop', () => {
    bud.use(imagemin)
    expect(imagemin.name).toBe(EXTENSION_HANDLE)
  })

  it('binds imagemin config class', () => {
    bud.use(imagemin)
    expect(bud.imagemin).toBeDefined()
  })

  it('automatically registered found imagemin plugins', () => {
    bud.use(imagemin)

    expect(
      bud.extensions.get(PLUGIN_HANDLE).options,
    ).toMatchSnapshot()
  })

  it('bud.imagemin.plugins returns bud', () => {
    bud.use(imagemin)
    expect(bud.imagemin.plugins([['foo', {}]])).toBeInstanceOf(
      Framework,
    )
  })

  it('bud.imagemin.plugins registers plugin', () => {
    bud.use(imagemin)
    bud.imagemin.plugins([['svgo', {interlaced: true}]])

    const options = bud.extensions.get(PLUGIN_HANDLE).options

    expect(options).toMatchSnapshot()
  })

  it('bud.imagemin.plugins overwrites previously registered plugins', () => {
    bud.use(imagemin)

    bud.imagemin.plugins([['foo', {options: 'boom'}]])
    bud.imagemin.plugins([['bar', {interlaced: true}]])

    const options = bud.extensions.get(PLUGIN_HANDLE).options

    expect(options).toMatchSnapshot()
  })
})
