import {config, factory, Framework} from '@roots/bud'
import * as BudBabel from '@roots/bud-babel'
import * as BudEmotion from '@roots/bud-emotion'
import * as BudReact from '@roots/bud-react'

describe('@roots/bud-emotion', () => {
  describe('settings', () => {
    let bud: Framework = null

    beforeAll(() => {
      bud = factory({config: {...config, ci: true}})
    })

    afterAll(done => {
      bud.close(done)
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

      bud.use([BudBabel, BudReact, BudEmotion])
    })

    it('has name prop', () => {
      expect(BudEmotion.name).toBe('@roots/bud-emotion')
    })

    it('sets up babel plugin', () => {
      expect(bud.babel.plugins['@emotion/babel-plugin']).toEqual(
        ['@emotion/babel-plugin', {}],
      )
    })
  })
})
