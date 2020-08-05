import type {Bud, Vue} from './Types'

const vue: Vue = function (vueOptions?: {enabled: boolean; options: any}): Bud {
  this.logger.info({name: 'bud.api', function: 'bud.vue', ...vueOptions}, `bud.vue called`)

  this.features.set({vue: vueOptions?.enabled ?? true})

  this.features.enabled('vue') &&
    this.options.merge(
      'vue',
      this.hooks.filter('api.vue.filter', vueOptions?.options),
    )

  return this
}

export {vue}
