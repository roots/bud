import Rule from '../Rule'

export const test: Rule.Factory<Rule.Conditional> = function () {
  return this.store['patterns'].get('svg')
}

export const use: Rule.Factory<Rule.Conditional> = function () {
  return [this.store['uses'].get('svg-loader').make()]
}
