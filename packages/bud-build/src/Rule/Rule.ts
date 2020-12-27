import {Framework, Rule, Webpack} from '@roots/bud-typings'
import {Service, isFunction} from '@roots/bud-support'

export default abstract class
  extends Service<Framework>
  implements Rule {
  protected module: Rule.Module

  protected props: Array<string> = [
    'enforce',
    'exclude',
    'include',
    'issuer',
    'oneOf',
    'options',
    'parser',
    'sideEffects',
    'query',
    'compiler',
    'rules',
    'test',
    'use',
  ]

  public abstract register(rule: Rule.Module): this

  public abstract make(): Webpack.RuleSetRule

  /**
   * Get enforce
   */
  public get enforce(): Rule.Module['enforce'] {
    return isFunction(this.module['enforce'])
      ? this.module['enforce'](this.app)
      : this.module['enforce']
  }

  /**
   * Set enforce
   */
  public set enforce(enforce: Rule.Module['enforce']) {
    this.module['enforce'] = enforce
  }

  /**
   * Get exclude
   */
  public get exclude(): Rule.Module['exclude'] {
    return isFunction(this.module['exclude'])
      ? this.module['exclude'](this.app)
      : this.module['exclude']
  }

  /**
   * Set exclude
   */
  public set exclude(exclude: Rule.Module['exclude']) {
    this.module['exclude'] = exclude
  }

  /**
   * Get include
   */
  public get include(): Rule.Module['include'] {
    return isFunction(this.module['include'])
      ? this.module['include'](this.app)
      : this.module['include']
  }

  /**
   * Set include
   */
  public set include(include: Rule.Module['include']) {
    this.module['include'] = include
  }

  /**
   * Get issuer
   */
  public get issuer(): Rule.Module['issuer'] {
    return isFunction(this.module['issuer'])
      ? this.module['issuer'](this.app)
      : this.module['issuer']
  }

  /**
   * Set issuer
   */
  public set issuer(issuer: Rule.Module['issuer']) {
    this.module['issuer'] = issuer
  }

  /**
   * Get oneOf
   */
  public get oneOf(): Rule.Module['oneOf'] {
    return isFunction(this.module['oneOf'])
      ? this.module['oneOf'](this.app)
      : this.module['oneOf']
  }

  /**
   * Set oneOf
   */
  public set oneOf(oneOf: Rule.Module['oneOf']) {
    this.module['oneOf'] = oneOf
  }

  /**
   * Get Options
   */
  public get options(): Rule.Module['options'] {
    return isFunction(this.module['oneOf'])
      ? this.module['oneOf'](this.app)
      : this.module['oneOf']
  }

  /**
   * Set Options
   */
  public set options(options: Rule.Module['options']) {
    this.module['options'] = options
  }

  /**
   * Get parser
   */
  public get parser(): Rule.Module['parser'] {
    return isFunction(this.module['parser'])
      ? this.module['parser'](this.app)
      : this.module['parser']
  }

  /**
   * Set parser
   */
  public set parser(parser: Rule.Module['parser']) {
    this.module['parser'] = parser
  }

  /**
   * Get resolve
   */
  public get resolve(): Rule.Resolve {
    return isFunction(this.module['resolve'])
      ? this.module['resolve'](this.app)
      : this.module['resolve']
  }

  /**
   * Set resolve
   */
  public set resolve(resolve: Rule.Resolve) {
    this.module['resolve'] = resolve
  }

  /**
   * Side effects
   */
  public get sideEffects(): Rule.SideEffects {
    return isFunction(this.module['sideEffects'])
      ? this.module['sideEffects'](this.app)
      : this.module['sideEffects']
  }

  public set sideEffects(sideEffects: Rule.SideEffects) {
    this.module['sideEffects'] = sideEffects
  }

  /**
   * Query
   */
  public get query(): Rule.Query {
    return isFunction(this.module['query'])
      ? this.module['query'](this.app)
      : this.module['query']
  }

  public set query(query: Rule.Query) {
    this.module['query'] = query
  }

  /**
   * Resource
   */
  public get resource(): Rule.Module['resource'] {
    return isFunction(this.module['resource'])
      ? this.module['resource'](this.app)
      : this.module['resource']
  }

  public set resource(resource: Rule.Module['resource']) {
    this.module['resource'] = resource
  }

  /**
   * Resource query
   */
  public get resourceQuery(): Rule.Conditional {
    return isFunction(this.module['resourceQuery'])
      ? this.module['resourceQuery'](this.app)
      : this.module['resourceQuery']
  }

  public set resourceQuery(resourceQuery: Rule.Conditional) {
    this.module['resourceQuery'] = resourceQuery
  }

  /**
   * Compiler
   */
  public get compiler(): Rule.Conditional {
    return isFunction(this.module['compiler'])
      ? this.module['compiler'](this.app)
      : this.module['compiler']
  }

  public set compiler(compiler: Rule.Conditional) {
    this.module['compiler'] = compiler
  }

  /**
   * Rules
   */
  public get rules(): Rule.OneOf {
    return isFunction(this.module['rules'])
      ? this.module['rules'](this.app)
      : this.module['rules']
  }

  public set rules(rules: Rule.OneOf) {
    this.module['rules'] = rules
  }

  /**
   * Test
   */
  public get test(): Rule.Module['test'] {
    return isFunction(this.module['test'])
      ? this.module['test'](this.app)
      : this.module['test']
  }

  public set test(test: Rule.Module['test']) {
    this.module['test'] = test
  }

  /**
   * Use
   */
  public get use(): Rule.Use {
    return isFunction(this.module['use'])
      ? this.module['use'](this.app)
      : this.module['use']
  }

  public set use(use: Rule.Use) {
    this.module['use'] = use
  }
}
