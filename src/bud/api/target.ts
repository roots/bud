import type {Bud, Target} from './Types'

const target: Target = function (target: string): Bud {
  this.state.options.target = target

  return this
}

export {target}
