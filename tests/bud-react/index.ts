import {Framework, setupBud, teardownBud, config} from '../util'
import babel from '@roots/bud-babel'
import react from '@roots/bud-react'

const DIR = process.cwd().concat('/examples/react')
const CONFIG = {
  ...config,
  location: {
    ...config.location,
    project: DIR,
  },
}

describe('@roots/bud-react', () => {
  describe('settings', () => {
    let bud: Framework = null

    beforeAll(done => {
      bud = setupBud('production', CONFIG)
      done()
    })

    afterAll(done => {
      bud = teardownBud(bud)
      done()
    })

    beforeEach(() => {
      bud.discovery
        .set('devDependencies', {
          '@roots/bud': 'workspace:packages/@roots/bud',
          '@roots/bud-babel':
            'workspace:packages/@roots/bud-babel',
          '@roots/bud-cli': 'workspace:packages/@roots/bud-cli',
          '@roots/bud-react':
            'workspace:packages/@roots/bud-react',
        })
        .set('dependencies', {
          react: '^17.0.2',
          'react-dom': '^17.0.2',
        })

      bud.use([babel, react])
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
})
