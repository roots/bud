import type {Bud, Option} from './types'

const option: Option = function (key: string): any {
  return this.state.options[key]
}

export {option}
