import {Framework, setupBud, teardownBud} from '../util'
import imagemin from '@roots/bud-imagemin'

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
      bud.extensions.get('@roots/bud-imagemin').module,
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
    expect(registered.module.when(bud)).toEqual(true)
    expect(registered.module.options).toBeInstanceOf(Function)
  })

  it('has name prop', () => {
    bud.use(imagemin)
    expect(imagemin.name).toBe('@roots/bud-imagemin')
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
        plugins: [['svgo', {plugins: [{removeViewBox: false}]}]],
      },
    })
  })

  it('options filter is functioning', () => {
    bud.discovery.set('devDependencies', {
      'imagemin-svgo': '^9.0.0',
    })
    bud.use(imagemin)

    expect(
      bud.hooks.filter(
        'extension/image-minimizer-webpack-plugin/options',
      ),
    ).toEqual({
      minimizerOptions: {
        plugins: [['svgo', {plugins: [{removeViewBox: false}]}]],
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
    bud.imagemin.plugins([
      ['svgo', {plugins: [{removeViewBox: false}]}],
    ])

    const options = bud.extensions
      .get(PLUGIN_HANDLE)
      .get('options')

    expect(options).toEqual({
      minimizerOptions: {
        plugins: [['svgo', {plugins: [{removeViewBox: false}]}]],
      },
    })
  })

  it('bud.imagemin.plugins overwrites previously registered plugins', () => {
    bud.use(imagemin)

    bud.imagemin.plugins([['foo', {options: 'boom'}]])
    bud.imagemin.plugins([
      ['bar', {plugins: [{removeViewBox: false}]}],
    ])

    const options = bud.extensions
      .get(PLUGIN_HANDLE)
      .get('options')

    expect(options).toEqual({
      minimizerOptions: {
        plugins: [['bar', {plugins: [{removeViewBox: false}]}]],
      },
    })
  })
})
