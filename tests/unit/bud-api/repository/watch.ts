import {config, factory, Framework} from '@roots/bud'

describe('bud.watch', function () {
  let bud: Framework

  let serverConfig

  beforeAll(() => {
    bud = factory({
      mode: 'development',
      config: {...config, ci: true},
    })

    serverConfig = {...bud.server.config.all()}
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
    const files = ['**/*.js']

    bud.watch(files)

    expect(bud.server.config.all()).toMatchSnapshot({
      ...serverConfig,
      watch: {
        ...serverConfig.watch,
        files,
      },
    })
  })

  it('sets watch options', () => {
    const files = ['**/*.js']
    const options = {cwd: process.cwd()}
    bud.watch(files, options)

    expect(bud.server.config.get('watch.options')).toBe(options)
  })
})
