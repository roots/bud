import {Framework, setupBud, teardownBud, config} from '../util'
import postcss from '@roots/bud-postcss'
import tailwindcss from '@roots/bud-tailwindcss'

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
      bud.discovery.set('devDependencies', {
        postcss: '*',
        ['postcss-preset-env']: '*',
        ['postcss-import']: '*',
        tailwindcss: '*',
      })

      bud.use([postcss, tailwindcss])

      done()
    })

    afterAll(done => {
      bud = teardownBud(bud)
      done()
    })

    it('extension has name prop', () => {
      expect(tailwindcss.name).toBe('@roots/bud-tailwindcss')
    })

    it('extension has name prop', () => {
      expect(bud.postcss.plugins).toEqual({
        'postcss-import': ['postcss-import', {}],
        'postcss-preset-env': [
          'postcss-preset-env',
          {
            stage: 1,
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
