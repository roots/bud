import type {Bud, Target} from './types'

const target: Target = function (this: Bud, target: string): Bud {
  this.webpack.set('target', this.hooks.filter('api.target', target))

  return this
}

export {target}
