/**
 * @module @roots/bud-react
 */

import './interface'

import {Module} from '@roots/bud-framework'

import RefreshExtension from './react-refresh'
import devScriptReducer from './util'

/**
 * @const extension
 */
const extension: Module = {
  name: '@roots/bud-react',
  boot: app => {
    /**
     * Exit early if peerDependencies unmet
     */
    if (!app.discovery.hasPeerDependency('react')) return

    app.babel.setPresets(['@babel/preset-react'])

    app.when(app.isDevelopment, () => {
      app.extensions.add(RefreshExtension)

      app.isDevelopment &&
        app.hooks.on('build/entry', devScriptReducer)
    })
  },
}

/**
 * @exports default
 * @exports extension
 */
export {extension as default, extension}

/**
 * @exports name
 * @exports boot
 */
export const {name, boot} = extension
