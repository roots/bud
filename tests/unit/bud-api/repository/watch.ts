import {factory, Framework} from '@roots/bud'

describe.skip('bud.watch', function () {
  let bud: Framework

  let serverConfig

  beforeAll(async () => {
    bud = await factory({
      config: {mode: 'development'},
    })

    serverConfig = {...bud.store.get('server')}
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

    expect(bud.store.get('server')).toMatchSnapshot({
      ...serverConfig,
      watch: {
        ...serverConfig.watch,
        files,
      },
    })
  })
})
