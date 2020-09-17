import {BudInterface, Plugin} from '@roots/bud'

/**
 * ## bud.typescript
 */
const configFunction = function (options: any | any[]) {
  options.configFile &&
    this.configs.set('typescript', options.configFile)

  this.options.merge('typescript', options)

  return this
}

const typescript: Plugin = (bud: BudInterface) => ({
  bud,

  make: function () {
    this.bud.addExtensions(['ts', 'tsx'])

    this.bud.patterns.set('typescript', /\.(ts|tsx)$/)

    this.bud.loaderModules.set(
      'typescript',
      require.resolve('ts-loader'),
    )

    this.bud.loaders.set('typescript', {
      loader: this.bud.loaderModules.get('typescript'),
      options: {
        configFile: this.bud.fs.resolve('tsconfig.json'),
      },
    })

    this.bud.rules.set('typescript', {
      test: bud.patterns.get('typescript'),
      exclude: bud.patterns.get('modules'),
      use: [bud.loaders.get('typescript')],
    })

    this.bud.apply('typescript', configFunction)
  },
})

module.exports = typescript
