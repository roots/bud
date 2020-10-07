import type Bud from '../../Bud'
/**
 * Build Rule
 *
 * @description
 *  Manufactures a RuleSet item.
 *
 * @class Rule
 */
declare class Rule {
  /**
   * The Bud instance.
   *
   * @type {Bud}
   * @memberof Rule
   */
  bud: Bud
  /**
   * Enforce rule as 'pre' or 'post'
   *
   * @type {Build.Rule.Enforce}
   */
  enforce?: Build.Rule.Enforce
  /**
   * Exclude
   *
   * @type {Build.Rule.Conditional}
   */
  exclude?: Build.Rule.Conditional
  /**
   * Include
   *
   * @type {Build.Rule.Conditional}
   */
  include?: Build.Rule.Conditional
  /**
   * Issuer
   *
   * @type {Build.Rule.Conditional}
   */
  issuer?: Build.Rule.Conditional
  /**
   * OneOf
   *
   * @type {Build.Rule.Conditional}
   */
  oneOf?: Build.Rule.OneOf
  /**
   * Options
   *
   * @type {Build.Rule.Conditional}
   */
  options?: Build.Rule.Query
  /**
   * Options for parsing
   */
  parser?: Build.Rule.Parser
  /**
   * Options for the resolver
   */
  resolve?: Build.Rule.Resolve
  /**
   * Flags a module as with or without side effects
   */
  sideEffects?: Build.Rule.Bool
  /**
   * Shortcut for use.query
   */
  query?: Build.Rule.Query
  /**
   * Module type to use for the module
   */
  type?: Build.Rule.Type
  /**
   * Match the resource path of the module
   */
  resource?: Build.Rule.Conditional
  /**
   * Match the resource query of the module
   */
  resourceQuery?: Build.Rule.Conditional
  /**
   * Compiler
   *
   * @type {Build.Rule.Conditional}
   */
  compiler?: Build.Rule.Conditional
  /**
   * Rules
   *
   * @type {Build.Rule.Conditional}
   */
  rules?: Build.Rule.OneOf
  /**
   * Test
   *
   * @type {Build.Rule.Conditional}
   */
  test?: Build.Rule.Conditional
  /**
   * Use
   *
   * @type {Build.Rule.Conditional}
   */
  use?: Build.Rule.Loader
  /**
   *Creates an instance of Rule.
   *
   * @param {Bud} bud
   * @param {Build.Rule.Generic} rule
   * @memberof Rule
   */
  constructor(bud: Bud, rule: Build.Rule.Generic)
  /**
   * Get the rule definition
   *
   * @returns {Build.Rule.Product}
   * @memberof Rule
   */
  get(): Build.Rule.Product
  /**
   * Make the Rule (for builder).
   *
   * @returns {Build.Rule.Product}
   * @memberof Rule
   */
  make(): Build.Rule.Product
}
export default Rule
//# sourceMappingURL=index.d.ts.map
