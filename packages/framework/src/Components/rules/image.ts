import Rule from '../Rule'

export const test: Rule.Factory<Rule.Conditional> = function () {
  return this.store['patterns'].get('image')
}

export const use: Rule.Factory<Rule.Conditional> = function () {
  return [this.store['uses'].get('file-loader').make()]
}
