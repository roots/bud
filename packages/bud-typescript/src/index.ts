import {join} from 'path'
import {Bud} from '@roots/bud'
import {Plugin} from '@roots/bud-framework'

const typescript: Plugin = (bud: Bud) => ({
  bud,

  make: function () {
    const configFile = join(this.bud.project('tsconfig.json'))

    if (this.bud.fs.existsSync(configFile)) {
      this.bud.configs.set('typescript', configFile)
      this.bud.options.set('typescript', {
        configFile: this.bud.configs.get('typescript'),
      })
    }

    this.bud.addExtensions(['ts', 'tsx'])

    this.bud.patterns.set('typescript', /\.(ts|tsx)$/)
    this.bud.loaders.set('typescript', require.resolve('ts-loader'))

    this.bud.uses.set('typescript', bud => ({
      loader: bud.loaders.get('typescript'),
      options: {
        configFile: bud.configs.get('typescript'),
      },
    }))

    this.bud.rules.set('typescript', bud => ({
      test: bud.patterns.get('typescript'),
      exclude: bud.patterns.get('vendor'),
      use: [bud.uses.get('typescript')],
    }))

    this.bud.apply('typescript', function (this: Bud, options) {
      options.configFile &&
        this.configs.set('typescript', options.configFile)

      this.options.merge('typescript', options)

      return this
    })
  },
})

export {typescript}
