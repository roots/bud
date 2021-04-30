import './interface'
import type {Module} from '@roots/bud-extensions'

import RefreshExtension from './react-refresh'
import devScriptReducer from './util'

const extension: Module = {
  name: '@roots/bud-react',
  boot: app => {
    app.babel.setPresets(['@babel/preset-react'])
    app.when(app.isDevelopment, () =>
      app
        .use(RefreshExtension)
        .hooks.on('entry', devScriptReducer),
    )
  },
}

export default extension
export const {name, boot} = extension
