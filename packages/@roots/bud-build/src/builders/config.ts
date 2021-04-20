import type {Framework} from '@roots/bud-framework'
import {posix} from 'path'
import os from 'os'

export function config(this: Framework): void {
  this.hooks
    .link('build', [
      'bail',
      // 'cache',
      'context',
      'devtool',
      'entry',
      'externals',
      'mode',
      'module',
      'name',
      'node',
      'output',
      'optimization',
      'parallelism',
      'performance',
      'plugins',
      'profile',
      'recordsPath',
      'resolve',
      'stats',
      'target',
    ])
    .hooks.link('build/optimization', [
      'emitOnErrors',
      'minimize',
      'minimizer',
      'runtimeChunk',
      'splitChunks',
    ])
    .hooks.link('build/resolve', [
      'alias',
      'extensions',
      'modules',
    ])
    .hooks.link('build/module', ['rules'])
    .hooks.link('build/cache', [
      'name',
      'type',
      'version',
      'directory',
      'buildDependencies',
    ])
    .hooks.link('build/output', [
      'path',
      'publicPath',
      'filename',
    ])

    .publish({
      'build/bail': () => true,
      'build/cache/name': () =>
        `${this.name}-${this.cache.version}`,
      'build/cache/type': () => 'filesystem',
      'build/cache/version': () => this.cache.version,
      'build/cache/directory': () => this.path('storage'),
      'build/cache/buildDependencies': () => ({
        defaultWebpack: ['webpack/lib/'],
        bud: ['@roots/'],
        project: [
          this.path('project', `${this.name}.config.js`),
          this.path('project', 'package.json'),
          this.path('src/'),
        ],
      }),
      'build/context': () => this.path('project'),
      'build/devtool': () => false,
      'build/entry': () => ({}),
      'build/externals': () => ({}),
      'build/mode': () => this.mode,

      'build/module/rules': () => [
        {
          parser: this.subscribe('build/module/rules/parser'),
          oneOf: this.subscribe('build/module/rules/oneOf'),
        },
      ],
      'build/module/rules/parser': () => ({
        requireEnsure: false,
      }),
      'build/module/rules/oneOf': () =>
        Object.values(this.subscribe('rule')),

      'build/name': () => this.name,
      'build/node': () => false,
      'build/optimization/emitOnErrors': () => false,
      'build/optimization/minimize': () => false,
      'build/optimization/minimizer': () => undefined,
      'build/optimization/removeEmptyChunks': () => true,
      'build/optimization/runtimeChunk': () => false,
      'build/optimization/splitChunks': () => false,
      'build/output/filename': () =>
        `${
          this.store.get('hash')
            ? this.store.get('hashFormat')
            : this.store.get('fileFormat')
        }.js`,
      'build/output/path': () => this.path('dist'),
      'build/output/publicPath': () => this.path('publicPath'),
      'build/parallelism': () => os.cpus().length - 1,
      'build/performance': () => false,
      'build/plugins': () => this.extensions.make(),
      'build/profile': () => false,
      'build/recordsPath': () =>
        this.path('storage', 'records.json'),
      'build/resolve/alias': () => ({}),
      'build/resolve/extensions': () => [
        '.wasm',
        '.mjs',
        '.js',
        '.css',
        '.json',
      ],
      'build/resolve/modules': () => [
        this.subscribe('location/src'),
        this.subscribe('location/modules'),
        ...this.discovery.getEntries().map(([k, v]) => {
          return posix.join(v.path)
        }),
      ],
      'build/stats': () => false,
      'build/target': () => 'web',
      'build/watch': () => true,
      'build/watchOptions': () => ({
        ignored: [this.store.get('patterns.modules').toString()],
        poll: 1000,
      }),
    })
}
