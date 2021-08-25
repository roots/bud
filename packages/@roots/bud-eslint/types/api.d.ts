import type {Framework} from '@roots/bud-framework'
import type {Options} from 'eslint-webpack-plugin'
import type {EslintConfig} from './interface'
export declare class Eslint implements EslintConfig {
  _app: () => Framework
  get app(): Framework
  constructor(app: Framework)
  config(userOptions: Options): Framework
}
//# sourceMappingURL=api.d.ts.map
