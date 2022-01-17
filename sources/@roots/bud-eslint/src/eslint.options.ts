import type {Framework} from '@roots/bud-framework'
import type {Options} from 'eslint-webpack-plugin'

export interface options {
  (app: Framework): Options
}

export const options: options = ({path}) => ({
  extensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
  cache: true,
  cacheLocation: path('storage', 'cache', 'eslint.json'),
  context: path('src'),
  cwd: path('project'),
  failOnError: true,
  baseConfig: {
    extends: ['eslint:recommended'],
    env: {
      node: true,
      es6: true,
      amd: true,
      browser: true,
    },
    parser: '@babel/eslint-parser',
    parserOptions: {
      ecmaFeatures: {
        experimentalObjectRestSpread: true,
        globalReturn: true,
        generators: false,
        impliedStrict: true,
        objectLiteralDuplicateProperties: false,
      },
      requireConfigFile: false,
    },
    plugins: ['import'],
    settings: {
      'import/core-modules': [],
      'import/ignore': [
        'node_modules',
        '\\.(coffee|scss|css|less|hbs|svg|json)$',
      ],
    },
    rules: {
      'no-console': 0,
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'ignore',
        },
      ],
    },
  },
})
