import {Bud, factory} from '@repo/test-kit/bud'
import BudTypescript from '@roots/bud-typescript'
import {assert} from 'console'

describe('@roots/bud-typescript', () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory().then(async bud => {
      await bud.extensions.add(BudTypescript)
      return bud
    })
  })

  it('is exposed', () => {
    expect(bud.typescript).toBeInstanceOf(BudTypescript)
  })

  it('is labeled', () => {
    expect(bud.extensions.get('@roots/bud-typescript').label).toBe(
      '@roots/bud-typescript',
    )
  })

  it('registered @roots/bud-typescript', () => {
    expect(bud.extensions.has('@roots/bud-typescript')).toBeTruthy()
  })

  it('registered @roots/bud-babel', () => {
    expect(bud.extensions.has('@roots/bud-babel')).toBeTruthy()
  })

  it('sets up ts module rule', async () => {
    await bud.extensions.runAll('_afterConfig')
    expect(bud.build.rules.ts).toBeDefined()
  })

  it('adds ts handling', () => {
    assert(bud.hooks.filter('build.resolve.extensions').has('.ts'))
  })

  it('adds tsx handling', () => {
    assert(bud.hooks.filter('build.resolve.extensions').has('.tsx'))
  })
})
