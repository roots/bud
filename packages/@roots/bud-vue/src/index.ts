// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * Adds vue sfc support to Bud projects
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud

 * @packageDocumentation @betaDocumentation
 */

import {Extension} from '@roots/bud-framework'
import {VueLoaderPlugin} from 'vue-loader'
import {
  Configuration,
  RuleSetRule,
  RuleSetUseItem,
} from 'webpack'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-vue': Extension.Module
    'vue-loader-plugin': Extension.Module
  }

  interface Loaders {
    vue: string
    'vue-style': string
  }

  interface Items {
    vue: RuleSetUseItem
    'vue-style': RuleSetUseItem
  }

  interface Rules {
    vue: RuleSetRule
  }
}

const VueExtension: Extension.Module = {
  name: '@roots/bud-vue',

  boot: app => {
    const {project, extensions, store, hooks} = app

    if (
      !project.hasPeerDependency('vue') ||
      !project.hasPeerDependency('@vue/compiler-sfc')
    )
      return

    hooks.on(
      'build/module/rules',
      (rules: Configuration['module']['rules']) => [
        {
          test: store.get('patterns.vue'),
          use: [{loader: require.resolve('vue-loader')}],
        },
        ...rules,
      ],
    )

    extensions.add({
      name: 'vue-loader-plugin',
      make: () => new VueLoaderPlugin(),
    })

    hooks.on(
      'build/resolve/alias',
      (aliases: Configuration['resolve']['alias']) => ({
        ...aliases,
        vue: '@vue/runtime-dom',
      }),
    )

    hooks.on(
      'build/resolve/extensions',
      (extensions: Configuration['resolve']['extensions']) => [
        ...extensions,
        '.vue',
      ],
    )
  },
}

export const {name, boot} = VueExtension
