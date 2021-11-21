import type {Framework} from '@roots/bud-framework'
import {chalk} from '@roots/bud-support'

export interface persist {
  (type?: 'memory' | 'filesystem' | false): Framework
}

export const persist: persist = function (
  type?: 'memory' | 'filesystem' | false,
) {
  this as Framework

  if (type === false) {
    this.api.log('success', {
      message: 'cache disabled',
    })
    this.hooks.on('build.cache', false)
    return this
  }

  if (type === 'memory') {
    this.api.log('success', {
      message: 'cache enabled',
      suffix: chalk.dim('memory'),
    })
    this.hooks.on('build.cache', {
      type: 'memory',
    })
    return this
  }

  this.api.log('success', {
    message: 'cache enabled',
    suffix: chalk.dim('filesystem'),
  })

  this.hooks
    .on('build.cache', () => ({
      type: this.hooks.filter('build.cache.type'),
      version: this.hooks.filter('build.cache.version'),
      cacheDirectory: this.hooks.filter(
        'build.cache.cacheDirectory',
      ),
      managedPaths: this.hooks.filter(
        'build.cache.managedPaths',
      ),
      buildDependencies: this.hooks.filter(
        'build.cache.buildDependencies',
      ),
    }))
    .hooks.on('build.cache.version', this.cache.version)
    .hooks.on('build.cache.type', 'filesystem')
    .hooks.on('build.cache.cacheDirectory', this.path('storage'))
    .hooks.on('build.cache.buildDependencies', () => ({
      bud: this.project.get('dependencies'),
    }))
    .hooks.on('build.cache.managedPaths', () => [
      this.path('modules'),
    ])

  return this
}
