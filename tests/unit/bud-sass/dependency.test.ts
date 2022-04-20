import {
  importSassImplementation,
  resolveLoader,
} from '@roots/bud-sass/src/sass.dependency'
import {Signale} from '@roots/bud-support'

describe('@roots/bud-sass dependency', () => {
  it('has dependency source', async () => {
    const importSass = await importSassImplementation(new Signale())

    const raw = await import('sass')

    expect(importSass).toStrictEqual(raw)
  })

  it('has resolveLoader', async () => {
    const resolved = resolveLoader(new Signale())
    expect(resolved).toContain('sass-loader')
  })
})
