import {Extension} from '@roots/bud-framework'
import {
  bind,
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import EslintPlugin, {Options} from 'eslint-webpack-plugin'

@label('@roots/bud-eslint')
@expose('eslint')
@plugin(EslintPlugin)
@options<Options>({
  extensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
  cacheLocation: app => app.path('@storage/cache/eslint'),
  cwd: app => app.path(),
  eslintPath: require.resolve('eslint'),
  resolvePluginsRelativeTo: app => app.path(),
  threads: false,
})
export default class BudEslint extends Extension<Options, EslintPlugin> {
  @bind
  public fix(fix: boolean = true): this {
    this.setOption('fix', fix)
    return this
  }
}
