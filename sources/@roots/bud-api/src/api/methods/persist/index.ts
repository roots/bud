import type {Framework} from '@roots/bud-framework'
import {chalk} from '@roots/bud-support'

export interface persist {
  (cacheStrategy?: 'memory' | 'filesystem' | false): Framework
}

export const persist: persist = function (
  cacheStrategy?: 'memory' | 'filesystem' | false,
) {
  const ctx = this as Framework

  if (cacheStrategy === false) {
    ctx.api.log('success', {
      message: 'cache disabled',
    })
    ctx.hooks.on('build.cache', () => false)
    return ctx
  }

  if (cacheStrategy === 'memory') {
    ctx.api.log('success', {
      message: 'cache enabled',
      suffix: chalk.dim('memory'),
    })

    ctx.hooks.on('build.cache', () => ({
      type: ctx.hooks.filter('build.cache.type'),
    }))
    ctx.hooks.on('build.cache.type', (): 'memory' => 'memory')
    return ctx
  }

  ctx.hooks
    .on('build.cache', () => ({
      type: ctx.hooks.filter('build.cache.type'),
      version: ctx.hooks.filter('build.cache.version'),
      cacheDirectory: ctx.hooks.filter('build.cache.cacheDirectory'),
      managedPaths: ctx.hooks.filter('build.cache.managedPaths'),
      buildDependencies: ctx.hooks.filter('build.cache.buildDependencies'),
    }))

    .hooks.on('build.cache.version', () => ctx.cache.version)
    .hooks.on('build.cache.type', (): 'filesystem' => 'filesystem')
    .hooks.on('build.cache.cacheDirectory', () =>
      ctx.path('storage', 'cache', 'webpack'),
    )
    .hooks.on('build.cache.buildDependencies', () => ({
      bud: ctx.project.get('dependencies'),
    }))
    .hooks.on('build.cache.managedPaths', () => [ctx.path('modules')])

  ctx.api.log('success', {
    message: 'cache enabled',
    suffix: chalk.dim('filesystem'),
  })

  return ctx
}
