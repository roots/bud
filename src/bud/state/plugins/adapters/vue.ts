import Vue from 'vue-loader/lib/plugin'
import type {WebpackAdapter} from './types'

const vue: WebpackAdapter = (): any => ({
  mergeOptions: function () {
    return this.bud.options.get('vue')
  },
  make: function () {
    return new Vue(this.options)
  },
  when: function (): boolean {
    return this.bud.features.enabled('vue')
  },
})

export {vue}
