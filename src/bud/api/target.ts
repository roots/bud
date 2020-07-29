import type {Bud, Target} from './Types'

const target: Target = function (target: string): Bud {
  this.options.set('target', target)

  return this
}

export {target}
