import type {Bud, Vue} from './Types'

const vue: Vue = function (vueOptions?: {enabled: boolean, options: any}): Bud {
  this.features.set('vue', vueOptions?.enabled ?? true)

  this.features.enabled('vue') &&
    this.options.merge('vue', vueOptions?.options)

  return this
}

export {vue}
