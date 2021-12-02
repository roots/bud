import type {Framework} from '@roots/bud-framework'
import {chalk} from '@roots/bud-support'

export interface persist {
  (type?: 'memory' | 'filesystem' | false): Framework
}

export const persist: persist = function (
  type?: 'memory' | 'filesystem' | false,
) {
  const ctx = this as Framework

  if (type === false) {
    ctx.api.log('success', {
      message: 'cache disabled',
    })
    ctx.hooks.on<'build.cache'>('build.cache', () => false)
    return this
  }

  if (type === 'memory') {
    ctx.api.log('success', {
      message: 'cache enabled',
      suffix: chalk.dim('memory'),
    })

    ctx.hooks.on<'build.cache.type'>(
      'build.cache.type',
      () => 'memory',
    )
    return this
  }

  ctx.api.log('success', {
    message: 'cache enabled',
    suffix: chalk.dim('filesystem'),
  })

  ctx.hooks
    .on('build.cache', () => ({
      type: ctx.hooks.filter('build.cache.type'),
      version: ctx.hooks.filter('build.cache.version'),
      cacheDirectory: ctx.hooks.filter(
        'build.cache.cacheDirectory',
      ),
      managedPaths: ctx.hooks.filter<'build.cache.managedPaths'>(
        'build.cache.managedPaths',
      ),
      buildDependencies:
        ctx.hooks.filter<'build.cache.buildDependencies'>(
          'build.cache.buildDependencies',
        ),
    }))
    .hooks.on<'build.cache.version'>(
      'build.cache.version',
      () => ctx.cache.version,
    )
    .hooks.on<'build.cache.type'>(
      'build.cache.type',
      () => 'filesystem',
    )
    .hooks.on('build.cache.cacheDirectory', () =>
      ctx.path('storage'),
    )
    .hooks.on<'build.cache.buildDependencies'>(
      'build.cache.buildDependencies',
      () => ({
        bud: ctx.project.get('dependencies'),
      }),
    )
    .hooks.on('build.cache.managedPaths', () => [
      ctx.path('modules'),
    ])

  return this
}
