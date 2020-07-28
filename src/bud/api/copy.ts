import {Bud, Copy} from './types'

const copy: Copy = function (
  this: Bud,
  from: string,
  to: string,
): Bud {
  this.state.options.copy.patterns.push({from, to})

  return this
}

export {copy}
