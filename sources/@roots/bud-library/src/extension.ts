import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import AutoDllPlugin from 'autodll-webpack-plugin'

import {factory} from './factory'

@label('@roots/bud-library')
@expose('library')
export default class BudDllExtension extends Extension<
  AutoDllPlugin.Options,
  AutoDllPlugin
> {
  @bind
  public async add(modules: string | Array<string>) {
    await this.app.extensions.add(factory(modules))
    return this.app
  }
}
