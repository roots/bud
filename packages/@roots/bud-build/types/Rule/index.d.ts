import type {Build, Framework} from '@roots/bud-framework'
declare class Rule implements Build.Rule {
  test: (app?: Framework) => RegExp
  use: (app?: Framework) => Build.Item[]
  exclude: Build.Rule.ExcludeFn
  type: Build.Rule.TypeFn
  parser: Build.Rule.ParserFn
  generator: any
  constructor({
    test,
    use,
    exclude,
    type,
    parser,
    generator,
  }: Build.Rule.Options)
  getTest(app: Framework): RegExp
  setTest(test: RegExp | ((app: Framework) => RegExp)): void
  getParser(app: Framework): Build.Rule.Parser
  setParser(parser: Build.Rule.ParserFn): void
  getUse(app: Framework): Build.Item[]
  setUse(use: Build.Rule.UseFn | Build.Item[]): void
  getExclude(app: Framework): Build.Rule.Output['exclude']
  setExclude(
    exclude: RegExp | ((app: Framework) => RegExp),
  ): void
  getType(app: Framework): string
  setType(type: any): void
  getGenerator(app: Framework): any
  setGenerator(generator: any): void
  make(app: Framework): Build.Rule.Output
}
export {Rule}
//# sourceMappingURL=index.d.ts.map
