/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @see https://roots.io/bud
 *
 * @remarks
 * - 💁 Composable - Build boss web applications with a modular, hackable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times with little to no configuration
 *
 * @export {name} The extension name
 * @export {boot} The extension boot function
 *
 * @author Kelly Mears <kelly@roots.io>
 * @license MIT
 *
 * @packageDocumentation
 */

import {Module} from '@roots/bud-framework'
import {VueLoaderPlugin} from 'vue-loader'
import {
  Configuration,
  RuleSetRule,
  RuleSetUseItem,
} from 'webpack'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/bud-vue': Module
      'vue-loader-plugin': Module
    }
  }

  namespace Hooks.Loader {
    interface Definitions {
      vue: string
      'vue-style': string
    }
  }

  namespace Hooks.Item {
    interface Definitions {
      vue: RuleSetUseItem
      'vue-style': RuleSetUseItem
    }
  }

  namespace Hooks.Rule {
    interface Definitions {
      vue: RuleSetRule
    }
  }
}

const vueExtension: Module = {
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

export const {name, boot} = vueExtension
