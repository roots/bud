import {join} from 'path'

type Typescript = () => any

const loader = require.resolve('ts-loader')

const rule: Function = (bud: any): any => ({
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

const typescript: Typescript = () => ({
  make: function () {
    /**
     * Load tsconfig.json and bail early if not found.
     */
    const config = join(this.bud.project('tsconfig.json'))
    if (!this.bud.fs.existsSync(config)) {
      return
    }

    /**
     * Set eslintrc to config container
     */
    this.bud.configs.set('typescript', config)

    /**
     * Enable eslint support
     */
    this.bud.features.set('ts', true)

    /**
     * Add eslint rule to webpack modules repository.
     */
    this.bud.rules.repository = [
      ...this.bud.rules.repository,
      (bud: any) => rule(bud),
    ]
  },
})

export = typescript
