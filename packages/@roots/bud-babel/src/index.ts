/**
 * ⚡️ Lightning fast frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @remarks
 * Adds babel support via the {@link BudBabelExtension}
 *
 * @packageDocumentation
 */

import type {Build} from '@roots/bud-framework'

import {BudBabelExtension} from './BudBabelExtension'
import {Config} from './Config'
import {DEFAULT_PLUGINS, DEFAULT_PRESETS} from './constants'

declare module '@roots/bud-framework' {
  interface Framework {
    babel: Config
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-babel': BudBabelExtension
    }

    interface Loaders {
      babel: Build.Loader
    }

    interface Items {
      babel: Build.Item
    }
  }
}

export {Config}

export {DEFAULT_PLUGINS, DEFAULT_PRESETS}

export const {name, register, boot} = BudBabelExtension
