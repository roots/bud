import {factory, Framework} from '@roots/bud'
import {Item, Loader, Rule} from '@roots/bud-build'

describe('bud.build', function () {
  let bud: Framework
  let initialBuildConfig

  beforeAll(async () => {
    bud = await factory({config: {ci: true, log: false}})
    initialBuildConfig = {...bud.build.config}
  })

  afterAll(done => {
    bud.close(done)
  })

  it('has expected rules', () => {
    expect(bud.build.rules).toMatchSnapshot()
  })

  it('all rules are Rule instances', () => {
    Object.values(bud.build.rules).forEach(rule => {
      expect(rule).toBeInstanceOf(Rule)
    })
  })

  it('has valid items', () => {
    Object.values(bud.build.items).forEach(item => {
      expect(item).toBeInstanceOf(Item)
    })
  })

  it('has valid loaders', () => {
    Object.values(bud.build.loaders).forEach(loader => {
      expect(loader).toBeInstanceOf(Loader)
    })
  })

  it('bud.build.rebuild modifies bud.build.config', () => {
    const entryValue = {
      app: {
        import: ['app.js'],
      },
    }

    bud.hooks.on('build/entry', () => entryValue)

    bud.build.make()

    expect(initialBuildConfig).not.toEqual(bud.build.config)
    expect(bud.build.config.entry).toEqual(entryValue)
  })
})
