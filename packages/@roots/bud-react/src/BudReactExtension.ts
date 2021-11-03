import type {Extension} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

import {BudReactRefreshPlugin} from './BudReactRefreshPlugin'

/**
 * Adds React support
 *
 * @remarks
 * Using babel
 *
 * @public
 */
export interface BudReactExtension extends Extension.Module {}

/**
 * Adds React support
 *
 * @remarks
 * Using babel
 *
 * @public
 */
export const BudReactExtension: BudReactExtension = {
  /**
   * {@inheritDoc @roots/bud-framework#Extension.Module.name}
   * @public
   */
  name: '@roots/bud-react',

  /**
   * {@inheritDoc @roots/bud-framework#Extension.Module.boot}
   * @public
   */
  boot: app => {
    app.babel.setPreset(
      '@babel/preset-react',
      require.resolve('@babel/preset-react'),
    )

    app.when(app.isDevelopment, app => {
      app.hooks
        .on('build/entry', entryHook)
        .extensions.add(BudReactRefreshPlugin)
    })
  },
}

/**
 * Adds react-refresh client script to each entrypoint
 *
 * @public
 */
function addRefresh(entries, [name, assets]) {
  return {
    ...(entries ?? {}),
    [name]: {
      ...assets,
      import: [
        'react-refresh/runtime',
        ...(assets.import ?? []),
      ],
    },
  }
}

/**
 * Callback for `build/entry` hook
 *
 * @public
 */
function entryHook(entry: Configuration['entry']) {
  return entry
    ? Object.entries(entry).reduce(addRefresh, entry)
    : {}
}
