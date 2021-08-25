import type {Framework} from '@roots/bud-framework'
declare class Config {
  _app: () => Framework
  get app(): Framework
  constructor(app: Framework)
  plugins(plugins: [string, any]): Framework
}
export {Config}
//# sourceMappingURL=Config.d.ts.map
