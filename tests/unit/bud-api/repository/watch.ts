import {config, factory, Framework} from '@roots/bud'

describe('bud.watch', function () {
  let bud: Framework

  beforeAll(() => {
    bud = factory({
      mode: 'development',
      config: {...config, ci: true},
    })
  })

  afterAll(done => {
    bud.close(done)
  })

  beforeEach(() => {
    bud.extensions.setStore({})
  })

  it('is a function', () => {
    expect(bud.watch).toBeInstanceOf(Function)
  })

  it("doesn't throw when called in production", () => {
    expect(bud.watch(['**/*.js'])).toBeInstanceOf(Framework)
  })

  it('sets watch files', () => {
    const value = ['**/*.js']

    bud.watch(value)

    expect(bud.server.config.get('watch.files')).toBe(value)
  })

  it('sets watch options', () => {
    const files = ['**/*.js']
    const options = {cwd: process.cwd()}
    bud.watch(files, options)

    expect(bud.server.config.get('watch.options')).toBe(options)
  })
})
