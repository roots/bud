// Type definitions for Rule
// Project: @roots/bud
// Definitions by: Kelly Mears <kelly@roots.io>

import Bud from '..'

export default class Rule {
  /**
   * The Bud instance.
   */
  bud: Bud

  /**
   * Enforce this rule as pre or post step
   */
  enforce?: Bud.Rule.Enforce

  /**
   * Shortcut for resource.exclude
   */
  exclude?: Bud.Rule.Conditional

  /**
   * Shortcut for resource.include
   */
  include?: Bud.Rule.Conditional

  /**
   * Match the issuer of the module (The module pointing to this module)
   */
  issuer?: Bud.Rule.Conditional

  /**
   * Only execute the first matching rule in this array
   */
  oneOf?: Bud.Rule.OneOf

  /**
   * Shortcut for use.options
   */
  options?: Bud.Rule.Query

  /**
   * Options for parsing
   */
  parser?: Bud.Rule.Parser

  /**
   * Options for the resolver
   */
  resolve?: Bud.Rule.Resolve

  /**
   * Flags a module as with or without side effects
   */
  sideEffects?: Bud.Rule.Bool

  /**
   * Shortcut for use.query
   */
  query?: Bud.Rule.Query

  /**
   * Module type to use for the module
   */
  type?: Bud.Rule.Type

  /**
   * Match the resource path of the module
   */
  resource?: Bud.Rule.Conditional

  /**
   * Match the resource query of the module
   */
  resourceQuery?: Bud.Rule.Conditional

  /**
   * Match the child compiler name
   */
  compiler?: Bud.Rule.Conditional

  /**
   * Match and execute these rules when this rule is matched
   */
  rules?: Bud.Rule.OneOf

  /**
   * Shortcut for resource.test
   */
  test?: Bud.Rule.Conditional

  /**
   * Modifiers applied to the module when rule is matched
   */
  use?: Bud.Rule.Loader

  /**
   * Instantiate with the bud
   * instance and an imported loader
   */
  constructor(bud: unknown, rule: Bud.Rule.Generic)

  /**
   * Get the loader definition
   */
  get(): Bud.Rule.Generic

  /**
   * Set the loader definition
   */
  set(rule: Bud.Rule.Generic): void

  /**
   * Make the ruleset.
   */
  make: () => Bud.Rule.Makes
}
