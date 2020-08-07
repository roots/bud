import type {Bud, Target} from './Types'

const target: Target = function (this: Bud, target: string): Bud {
  this.hooks.call('pre_target', target)

  this.options.set('target', this.hooks.filter('filter_target_option', target))

  this.hooks.call('post_target')

  return this
}

export {target}
