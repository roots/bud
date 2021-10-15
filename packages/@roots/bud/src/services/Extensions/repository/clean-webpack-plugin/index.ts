import {
  Extension,
  Factory,
  Framework,
} from '@roots/bud-framework'
import {Container} from '@roots/container'
import {
  CleanWebpackPlugin as Plugin,
  Options,
} from 'clean-webpack-plugin'

interface BudCleanPluginAdapter
  extends Extension.CompilerPlugin<Plugin, Options> {
  options(app: Framework): Options
  make: Factory<[Container<Options>, Framework], Plugin>
  when: Factory<[Framework, Container<Options>?], boolean>
}

const BudCleanPluginAdapter: BudCleanPluginAdapter = {
  name: 'clean-webpack-plugin',
  options: ({store}) =>
    store.get('extension.cleanWebpackPlugin'),
  make: options => new Plugin(options.all()),
  when: ({store}) => store.isTrue('clean'),
}

export const {name, options, when, make} = BudCleanPluginAdapter
