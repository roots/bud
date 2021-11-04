import {factory, Framework} from '@roots/bud'

describe.skip('bud.watch', function () {
  let bud: Framework

  let serverConfig

  beforeAll(async () => {
    bud = await factory({
      mode: 'development',
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
})
