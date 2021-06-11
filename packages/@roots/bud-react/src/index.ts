import './interface'
import {Module} from '@roots/bud-framework'

import RefreshExtension from './react-refresh'
import devScriptReducer from './util'

const extension: Module = {
  name: '@roots/bud-react',
  boot: app => {
    /**
     * Exit early if peerDepenedencies unmet
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

export default extension
export const {name, boot} = extension
