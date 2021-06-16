import {Framework, setupBud, teardownBud} from '../util'
import imagemin from '@roots/bud-imagemin'

const EXTENSION_HANDLE = '@roots/bud-imagemin'
const PLUGIN_HANDLE = 'image-minimizer-webpack-plugin'

describe('@roots/bud-imagemin', () => {
  let bud: Framework

  beforeAll(() => {
    bud = setupBud('production')
  })

  afterAll(() => {
    bud = teardownBud(bud)
  })

  it('is registered', () => {
    bud.use([imagemin])
    expect(imagemin).toEqual(
      bud.extensions.get(EXTENSION_HANDLE).module,
    )
  })

  it('exports and registers a bud webpack plugin interface', () => {
    bud.use(imagemin)
    const registered = bud.extensions.get(PLUGIN_HANDLE)

    expect(registered.module.name).toBe(
      'image-minimizer-webpack-plugin',
    )
    expect(registered.module.make).toBeInstanceOf(Function)
    expect(registered.module.when).toBeInstanceOf(Function)
    expect(registered.module.when).toBeInstanceOf(Function)
    expect(registered.module.options).toBeInstanceOf(Function)
  })

  it('is not used when there are no imagemin plugins registered', () => {
    bud.discovery.set('devDependencies', {})
    bud.use(imagemin)

    const registered = bud.extensions.get(PLUGIN_HANDLE)

    expect(registered.when).toEqual(false)
  })

  it('is used when there are imagemin plugins registered', () => {
    bud.discovery.set('devDependencies', {
      'imagemin-svgo': '^9.0.0',
    })
    bud.use(imagemin)

    const registered = bud.extensions.get(PLUGIN_HANDLE)

    expect(registered.when).toEqual(true)
  })

  it('has name prop', () => {
    bud.use(imagemin)
    expect(imagemin.name).toBe(EXTENSION_HANDLE)
  })

  it('has an api prop', () => {
    bud.use(imagemin)

    expect(imagemin.api(bud).imagemin.plugins).toBeInstanceOf(
      Function,
    )
  })

  it('automatically registered found imagemin plugins', () => {
    bud.discovery.set('devDependencies', {
      'imagemin-svgo': '^9.0.0',
    })
    bud.use(imagemin)

    expect(
      bud.extensions.get(PLUGIN_HANDLE).get('options'),
    ).toEqual({
      minimizerOptions: {
        plugins: [['svgo', {removeViewBox: false}]],
      },
    })
  })

  it('options filter is functioning', () => {
    bud.discovery.set('devDependencies', {
      'imagemin-svgo': '^9.0.0',
    })
    bud.use(imagemin)

    expect(
      bud.hooks.filter(`extension/${PLUGIN_HANDLE}/options`),
    ).toEqual({
      minimizerOptions: {
        plugins: [['svgo', {removeViewBox: false}]],
      },
    })
  })

  it('bud.imagemin.plugins returns bud', () => {
    bud.use(imagemin)
    expect(bud.imagemin.plugins([['foo', {}]])).toBeInstanceOf(
      Framework,
    )
  })

  it('bud.imagemin.plugins registers plugin', () => {
    bud.use(imagemin)
    bud.imagemin.plugins([['svgo', {removeViewBox: false}]])

    const options = bud.extensions
      .get(PLUGIN_HANDLE)
      .get('options')

    expect(options).toEqual({
      minimizerOptions: {
        plugins: [['svgo', {removeViewBox: false}]],
      },
    })
  })

  it('bud.imagemin.plugins overwrites previously registered plugins', () => {
    bud.use(imagemin)

    bud.imagemin.plugins([['foo', {options: 'boom'}]])
    bud.imagemin.plugins([['bar', {removeViewBox: false}]])

    const options = bud.extensions
      .get(PLUGIN_HANDLE)
      .get('options')

    expect(options).toEqual({
      minimizerOptions: {
        plugins: [['bar', {removeViewBox: false}]],
      },
    })
  })
})
