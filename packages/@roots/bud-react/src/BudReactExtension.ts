import type {Extension} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

import {BudReactRefreshPlugin} from './BudReactRefreshPlugin'

/**
 * Adds React support
 */
export interface BudReactExtension extends Extension.Module {}

export const BudReactExtension: BudReactExtension = {
  name: '@roots/bud-react',

  boot: app => {
    app.when(app.project.hasPeerDependency('react'), app => {
      app.babel.setPresets(['@babel/preset-react'])

      app.when(app.isDevelopment, app => {
        app.hooks
          .on('build/entry', entryHook)
          .extensions.add(BudReactRefreshPlugin)
      })
    })
  },
}

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

function entryHook(entry: Configuration['entry']) {
  return entry
    ? Object.entries(entry).reduce(addRefresh, entry)
    : {}
}
