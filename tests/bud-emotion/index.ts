import {Framework, setupBud, teardownBud, config} from '../util'
import babel from '@roots/bud-babel'
import react from '@roots/bud-react'
import emotion from '@roots/bud-emotion'

const DIR = process.cwd().concat('/examples/emotion')
const CONFIG = {
  ...config,
  location: {
    ...config.location,
    project: DIR,
  },
}

describe('@roots/bud-emotion', () => {
  describe('settings', () => {
    let bud: Framework = null

    beforeAll(() => {
      bud = setupBud('production', CONFIG)
      return
    })

    afterAll(() => {
      bud = teardownBud(bud)
      return
    })

    beforeEach(() => {
      bud.discovery
        .set('devDependencies', {
          '@emotion/css': '^11.1.3',
          '@emotion/react': '^11.4.0',
          '@emotion/styled': '^11.3.0',
          '@roots/bud': 'workspace:packages/@roots/bud',
          '@roots/bud-babel':
            'workspace:packages/@roots/bud-babel',
          '@roots/bud-cli': 'workspace:packages/@roots/bud-cli',
          '@roots/bud-emotion':
            'workspace:packages/@roots/bud-emotion',
          '@roots/bud-react':
            'workspace:packages/@roots/bud-react',
        })
        .set('dependencies', {
          react: '^17.0.2',
          'react-dom': '^17.0.2',
        })

      bud.use([babel, react, emotion])
    })

    it('has name prop', () => {
      expect(emotion.name).toBe('@roots/bud-emotion')
    })

    it('sets up babel plugin', () => {
      expect(bud.babel.plugins['@emotion/babel-plugin']).toEqual(
        ['@emotion/babel-plugin', {}],
      )
    })
  })
})
