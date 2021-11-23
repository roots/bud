import type {Framework} from '@roots/bud-framework'

export interface publicPath {
  (): string
}

export const publicPath: publicPath = function () {
  this as Framework

  const value = this.hooks.filter('build.output.publicPath')
  this.api.log('log', {
    message: 'publicPath',
    suffix: value,
  })
  return value
}
