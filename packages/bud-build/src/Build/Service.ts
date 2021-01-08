import {Service} from '@roots/bud-support'
import type {Webpack, Framework} from '@roots/bud-typings'

export default abstract class extends Service<Framework> {
  public builders: Partial<Framework.Build.Builder>

  public loaders

  public items

  public rules

  public abstract make(): Webpack.Configuration

  public abstract setLoader(
    name: string,
    loader: Framework.Loader,
  ): Framework.Loader

  public abstract getLoader(name: string): Framework.Loader

  public abstract getItem(name: string): Framework.Item

  public abstract setItem(
    name: string,
    module: Framework.Item.Module,
  ): Framework.Item

  public abstract getRule(name: string): Framework.Rule

  public abstract setRule(
    name: string,
    module: Framework.Rule.Module,
  ): Framework.Rule
}
