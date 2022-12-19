import chalk from 'chalk'

export const identity = <X extends unknown>(x: X): X => x

export const theme: Record<string, any> = {
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
  regexp: chalk.blue,

  /**
   * literal string, character
   */
  string: chalk.white,

  /**
   * parsed section inside a literal string
   */
  subst: chalk.blue.dim,

  /**
   * symbolic constant, interned string, goto label
   */
  symbol: chalk.magenta,

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
  title: chalk.magenta,

  /**
   * block of function arguments (parameters) at the place of declaration
   */
  params: chalk.magenta,

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
  'meta-keyword': chalk.dim,

  /**
   * string within meta construct
   */
  'meta-string': chalk.dim,

  /**
   * heading of a section in a config file, heading in text markup
   */
  section: chalk.dim,

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
  'builtin-name': chalk.blue,

  /**
   * name of an attribute with no language defined semantics (keys in JSON, setting names in
   * .ini), also sub-attribute within another highlighted object, like XML tag
   */
  attr: chalk.cyan,

  /**
   * name of an attribute followed by a structured value part, like CSS properties
   */
  attribute: chalk.dim,

  /**
   * variable in a config or a template file, environment var expansion in a script
   */
  variable: chalk.dim,

  /**
   * list item bullet in text markup
   */
  bullet: chalk.dim,

  /**
   * code block in text markup
   */
  code: chalk.dim,

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
  formula: chalk.dim,

  /**
   * hyperlink in text markup
   */
  link: chalk.underline,

  /**
   * quotation in text markup
   */
  quote: chalk.dim,

  /**
   * tag selector in CSS
   */
  'selector-tag': chalk.dim,

  /**
   * #id selector in CSS
   */
  'selector-id': chalk.dim,

  /**
   * .class selector in CSS
   */
  'selector-class': chalk.dim,

  /**
   * [attr] selector in CSS
   */
  'selector-attr': chalk.dim,

  /**
   * :pseudo selector in CSS
   */
  'selector-pseudo': chalk.dim,

  /**
   * tag of a template language
   */
  'template-tag': chalk.dim,

  /**
   * variable in a template language
   */
  'template-variable': chalk.dim,

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
  default: chalk.white,
}
