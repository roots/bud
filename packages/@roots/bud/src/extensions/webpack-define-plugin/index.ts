import {DefinePlugin} from 'webpack'
import type {Plugin} from '@roots/bud-framework'

interface Options {
  definitions: DefinePlugin['definitions']
}

const extension: Plugin<DefinePlugin, Options> = {
  name: 'webpack-define-plugin',
  make: options => new DefinePlugin(options.all()),
  when: (_bud, opts) => opts.getEntries()?.length > 0,
  options: ({env, store}) => {
    /**
     * .env values which contain PUBLIC
     */
    const fromEnv = env
      .getEntries()
      .filter(([k]: [string, string]) =>
        k.includes('APP_PUBLIC'),
      )
      .reduce(
        (a, [k, v]) => ({...a, [k]: JSON.stringify(v)}),
        {},
      )

    const fromStore = store.get('extension.webpackDefinePlugin')

    return {
      ...fromEnv,
      ...fromStore,
    }
  },
}

export default extension
export const {name, make, when, options} = extension
