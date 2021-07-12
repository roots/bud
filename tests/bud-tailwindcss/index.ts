import {Framework, setupBud, teardownBud, config} from '../util'
import postcss from '@roots/bud-postcss'
import * as tailwindcss from '@roots/bud-tailwindcss'

const NAME = 'tailwindcss'
const DIR = process.cwd().concat('/examples/tailwindcss')
const CONFIG = {
  ...config,
  location: {
    ...config.location,
    project: DIR,
  },
}

const projectPath = (file: string) =>
  `${CONFIG.location.project}/${file}`

describe(NAME, () => {
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
      bud.discovery.set('devDependencies', {
        postcss: '*',
        ['postcss-preset-env']: '*',
        ['postcss-import']: '*',
        tailwindcss: '*',
      })

      bud.use([postcss, tailwindcss])
    })

    it('has name prop', () => {
      expect(tailwindcss.name).toBe('@roots/bud-tailwindcss')
    })

    it('has an api prop', () => {
      expect(tailwindcss.api.tailwind).toBeInstanceOf(Function)
    })

    it('sets up postcss plugins', () => {
      expect(bud.postcss.plugins).toEqual({
        import: ['postcss-import', {}],
        'preset-env': [
          'postcss-preset-env',
          {
            stage: 1,
            features: {
              'focus-within-pseudo-class': false,
            },
          },
        ],
        tailwindcss: [
          'tailwindcss',
          projectPath('tailwind.config.js'),
        ],
      })
    })
  })
})
