import './interface'
import {Framework, Module} from '@roots/bud-framework'
import type {Configuration} from 'webpack'
import * as ReactRefreshWebpackPlugin from './react-refresh'

const extension: Module = {
  name: '@roots/bud-react',

  devDependencies: ['@babel/preset-react', 'react-refresh'],

  dependencies: ['react', 'react-dom'],

  boot({babel, isDevelopment, when}): void {
    babel.setPresets(['@babel/preset-react'])

    when(isDevelopment, (app: Framework) =>
      app
        .use(ReactRefreshWebpackPlugin)
        .hooks.on('entry', (entry: Configuration['entry']) =>
          Object.entries(entry).reduce(
            (a, [name, assets]: [string, string[]]) => ({
              ...a,
              [name]: [`react-refresh/runtime`, ...assets],
            }),
            {},
          ),
        ),
    )
  },
}

export {extension as default}

const {name, boot, devDependencies, dependencies} = extension
export {name, boot, devDependencies, dependencies}
