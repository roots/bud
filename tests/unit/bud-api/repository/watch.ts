import {Bud, factory} from '@roots/bud'

describe.skip('bud.watch', function () {
  let bud: Bud

  let serverConfig

  beforeAll(async () => {
    bud = await factory({
      config: {
        mode: 'development',
        features: {
          dashboard: false,
          log: false,
        },
      },
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
    expect(bud.watch(['**/*.js'])).toBeInstanceOf(Bud)
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
