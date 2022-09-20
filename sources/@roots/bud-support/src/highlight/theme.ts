import chalk from 'chalk'

export const identity = (x: unknown): unknown => x

export const theme = {
  /**
   * keyword in a regular Algol-style language
   */
  keyword: chalk.blue,

  /**
   * built-in or library object (constant, class, function)
   */
  built_in: chalk.cyan,

  /**
   * user-defined type in a language with first-class syntactically significant types, like
   * Haskell
   */
  type: chalk.cyan.dim,

  /**
   * special identifier for a built-in value ("true", "false", "null")
   */
  literal: chalk.blue,

  /**
   * number, including units and modifiers, if any.
   */
  number: chalk.green,

  /**
   * literal regular expression
   */
  regexp: chalk.red,

  /**
   * literal string, character
   */
  string: chalk.red,

  /**
   * parsed section inside a literal string
   */
  subst: identity,

  /**
   * symbolic constant, interned string, goto label
   */
  symbol: identity,

  /**
   * class or class-level declaration (interfaces, traits, modules, etc)
   */
  class: chalk.blue,

  /**
   * function or method declaration
   */
  function: chalk.yellow,

  /**
   * name of a class or a function at the place of declaration
   */
  title: identity,

  /**
   * block of function arguments (parameters) at the place of declaration
   */
  params: identity,

  /**
   * comment
   */
  comment: chalk.green,

  /**
   * documentation markup within comments
   */
  doctag: chalk.green,

  /**
   * flags, modifiers, annotations, processing instructions, preprocessor directive, etc
   */
  meta: chalk.grey,

  /**
   * keyword or built-in within meta construct
   */
  'meta-keyword': identity,

  /**
   * string within meta construct
   */
  'meta-string': identity,

  /**
   * heading of a section in a config file, heading in text markup
   */
  section: identity,

  /**
   * XML/HTML tag
   */
  tag: chalk.grey,

  /**
   * name of an XML tag, the first word in an s-expression
   */
  name: chalk.blue,

  /**
   * s-expression name from the language standard library
   */
  'builtin-name': identity,

  /**
   * name of an attribute with no language defined semantics (keys in JSON, setting names in
   * .ini), also sub-attribute within another highlighted object, like XML tag
   */
  attr: chalk.cyan,

  /**
   * name of an attribute followed by a structured value part, like CSS properties
   */
  attribute: identity,

  /**
   * variable in a config or a template file, environment var expansion in a script
   */
  variable: identity,

  /**
   * list item bullet in text markup
   */
  bullet: identity,

  /**
   * code block in text markup
   */
  code: identity,

  /**
   * emphasis in text markup
   */
  emphasis: chalk.italic,

  /**
   * strong emphasis in text markup
   */
  strong: chalk.bold,

  /**
   * mathematical formula in text markup
   */
  formula: identity,

  /**
   * hyperlink in text markup
   */
  link: chalk.underline,

  /**
   * quotation in text markup
   */
  quote: identity,

  /**
   * tag selector in CSS
   */
  'selector-tag': identity,

  /**
   * #id selector in CSS
   */
  'selector-id': identity,

  /**
   * .class selector in CSS
   */
  'selector-class': identity,

  /**
   * [attr] selector in CSS
   */
  'selector-attr': identity,

  /**
   * :pseudo selector in CSS
   */
  'selector-pseudo': identity,

  /**
   * tag of a template language
   */
  'template-tag': identity,

  /**
   * variable in a template language
   */
  'template-variable': identity,

  /**
   * added or changed line in a diff
   */
  addition: chalk.green,

  /**
   * deleted line in a diff
   */
  deletion: chalk.red,

  /**
   * things not matched by any token
   */
  default: identity,
}
