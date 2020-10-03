import Rule from '../Rule'

export const test: Rule.Factory<Rule.Conditional> = function () {
  return this.store['patterns'].get('js')
}

export const exclude: Rule.Factory<Rule.Conditional> = function () {
  return this.store['patterns'].get('modules')
}

export const use: Rule.Factory<Rule.Loader> = function () {
  return [this.store['uses'].get('babel-loader').make()]
}
