import {join} from 'path'
import {Bud, Extension, ExtensionInterface, Rule} from '@roots/bud'

const loader = require.resolve('ts-loader')

const rule: Rule = (bud: Bud) => ({
  test: /\.(ts|tsx)$/,
  exclude: bud.patterns.get('vendor'),
  use: [
    {
      loader,
      options: {
        configFile: bud.configs.get('typescript'),
      },
    },
  ],
})

const typescript: Extension = (bud: Bud): ExtensionInterface => ({
  bud,

  make: function (this: ExtensionInterface) {
    /**
     * Load tsconfig.json and bail early if not found.
     */
    const config = join(this.bud.project('tsconfig.json'))
    if (!this.bud.fs.existsSync(config)) {
      return
    }

    this.bud.configs.set('typescript', config)
    this.bud.features.set('ts', true)
    this.bud.rules.repository = [...this.bud.rules.repository, rule]
  },
})

export = typescript
