import {Service} from '@roots/bud-framework'

import * as loaders from './loaders'
import * as items from './items'
import * as rules from './rules'
import {config} from './config'

import {boundMethod as bind} from 'autobind-decorator'

import type Webpack from 'webpack'
import type {Build as Contract} from '@roots/bud-framework'

export class Build extends Service implements Contract {
  public name = '@roots/bud-build'

  public loaders: {[key: string]: Contract.Loader}

  public rules: {[key: string]: Contract.Rule}

  public items: {[key: string]: Contract.Item}

  public _config: Webpack.Configuration

  public get config(): Webpack.Configuration {
    if (!this._config) {
      this.rebuild()
    }

    return this._config
  }

  public rebuild(): Webpack.Configuration {
    this._config = this.app.hooks.filter('build')

    return this._config
  }

  @bind
  public register(): void {
    const componentReducer = (a, [k, v]) => ({...a, [k]: v()})

    this.loaders = this.app
      .container(loaders)
      .getEntries()
      .reduce(componentReducer, {})

    this.rules = this.app
      .container(rules)
      .getEntries()
      .reduce(componentReducer, {})

    this.items = this.app
      .container(items)
      .getEntries()
      .reduce(componentReducer, {})

    this.app.hooks.on('before', () => [])
    this.app.hooks.on('after', () => [])

    config(this.app)
  }
}
