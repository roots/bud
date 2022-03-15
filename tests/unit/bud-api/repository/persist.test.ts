import {Bud, factory} from '@repo/test-kit/bud'

describe('bud.persist', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  beforeEach(async () => {
    await bud.api.call(`persist`, false)
    expect(bud.cache.enabled).toBe(false)
  })

  it('is a function', () => {
    expect(bud.persist).toBeInstanceOf(Function)
  })

  it('sets version', async () => {
    await bud.api.call(`persist`, 'filesystem')
    const {version} = bud.cache.configuration as {version: string}
    expect(version).toBe(bud.cache.version)
  })

  it('sets type', async () => {
    expect(bud.cache.type).toBe(bud.cache.type)
  })

  it('sets cache directory', async () => {
    expect(bud.cache.cacheDirectory).toEqual(bud.cache.cacheDirectory)
  })

  it('sets buildDependencies', async () => {
    expect(bud.cache.buildDependencies).toMatchSnapshot({
      bud: [
        expect.stringContaining('package.json'),
        expect.stringContaining('.eslintrc.js'),
        expect.stringContaining('bud.config.js'),
        expect.stringContaining('docker-compose.yml'),
        expect.stringContaining('tailwind.config.js'),
        expect.stringContaining('tsconfig.json'),
      ],
    })
  })

  it('set managedPaths', async () => {
    expect(bud.cache.managedPaths).toEqual([bud.path('@modules')])
  })

  it('disables caching', async () => {
    await bud.api.call(`persist`, false)
    expect(bud.cache.enabled).toBe(false)
  })

  it('memory caching', async () => {
    await bud.api.call(`persist`, `memory`)
    expect(bud.cache.type).toBe('memory')
  })
})
