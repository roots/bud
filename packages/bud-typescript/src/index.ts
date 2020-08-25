import {join} from 'path'
import {Bud, Extension, ExtensionInterface} from '@roots/bud'

type FluentConfig = (
  this: Bud,
  options: {
    configFile?: string
  },
) => Bud

const publicConfig: FluentConfig = function (this: Bud, options) {
  options.configFile &&
    this.configs.set('typescript', options.configFile)

  this.options.merge('typescript', options)

  return this
}

const typescript: Extension = bud => ({
  bud,
  name: 'typescript',
  make: function (this: ExtensionInterface) {
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
    this.bud.uses.set('typescript', (bud: Bud) => ({
      loader: bud.loaders.get('typescript'),
      options: {
        configFile: bud.configs.get('typescript'),
      },
    }))

    this.bud.rules.push((bud: Bud) => ({
      test: bud.patterns.get('typescript'),
      exclude: bud.patterns.get('vendor'),
      use: [bud.uses.get('typescript')],
    }))

    this.bud.apply('typescript', publicConfig)
  },
})

export {typescript}
