import {Framework, setupBud, teardownBud} from '../util'
import babel from '@roots/bud-babel'
import react from '@roots/bud-react'

describe('@roots/bud-react', () => {
  let bud: Framework = null

  let mock = {
    devDependencies: {
      '@roots/bud': 'workspace:packages/@roots/bud',
      '@roots/bud-babel': 'workspace:packages/@roots/bud-babel',
      '@roots/bud-cli': 'workspace:packages/@roots/bud-cli',
      '@roots/bud-react': 'workspace:packages/@roots/bud-react',
    },
    dependencies: {
      react: '^17.0.2',
      'react-dom': '^17.0.2',
    },
  }

  beforeAll(() => {
    bud = setupBud()
    bud.discovery
      .set('devDependencies', mock.devDependencies)
      .set('dependencies', mock.dependencies)

    bud.use([babel, react])
  })

  afterAll(() => {
    bud = teardownBud(bud)
  })

  it('has name prop', () => {
    expect(react.name).toBe('@roots/bud-react')
  })

  it('sets up babel plugin', () => {
    expect(bud.babel.presets['@babel/preset-react']).toEqual([
      '@babel/preset-react',
      {},
    ])
  })
})
