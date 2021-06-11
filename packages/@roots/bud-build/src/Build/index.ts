import {posix} from 'path'

import Webpack from 'webpack'
import RemarkHTML from 'remark-html'
import {loader as MiniCssLoader} from 'mini-css-extract-plugin'
import {boundMethod as bind} from 'autobind-decorator'

import {Service} from '@roots/bud-framework'
import {Loader} from '../Loader'
import {Rule} from '../Rule'
import {Item} from '../Item'
import {config} from './config'

import type {
  Framework,
  Build as Contract,
} from '@roots/bud-framework'

class Build extends Service implements Contract {
  public name = '@roots/bud-build'

  public loaders: Contract['loaders'] = {}

  public rules: Contract['rules'] = {}

  public items: Contract['items'] = {}

  public get config(): Webpack.Configuration {
    return this.app.hooks.filter('build')
  }

  @bind
  public register(): void {
    this.app.hooks.on('before', () => this.app)
    this.app.hooks.on('after', () => this.config)

    this.loaders = {
      css: new Loader(require.resolve('css-loader')),
      html: new Loader(require.resolve('html-loader')),
      md: new Loader(require.resolve('remark-loader')),
      style: new Loader(require.resolve('style-loader')),
      minicss: new Loader(MiniCssLoader),
      file: new Loader(require.resolve('file-loader')),
      url: new Loader(require.resolve('url-loader')),
      'resolve-url': new Loader(
        require.resolve('resolve-url-loader'),
      ),
    }

    this.items = {
      css: new Item({
        loader: ({build}) => build.loaders.css,
        options: ({hooks}) => ({
          sourceMap: hooks.filter('build/devtool') ?? false,
          importLoaders: 1,
        }),
      }),
      html: new Item({
        loader: ({build}) => build.loaders.html,
      }),
      style: new Item({
        loader: ({build}) => build.loaders.style,
      }),
      md: new Item({
        loader: ({build}) => build.loaders.md,
        options: {
          remarkOptions: {
            plugins: [RemarkHTML],
          },
        },
      }),
      minicss: new Item({
        loader: ({build}) => build.loaders.minicss,
        options: ({path}: Framework) => ({
          publicPath: posix.normalize(
            posix.dirname(
              posix.relative(path('project'), path('src')),
            ),
          ),
        }),
      }),
      raw: new Item({
        loader: ({build}) => build.loaders.raw,
      }),
      file: new Item({
        loader: ({build}) => build.loaders.file,
        options: ({store}) => ({
          name: `${
            store.isTrue('hash')
              ? store.get('hashFormat')
              : store.get('fileFormat')
          }.[ext]`,
        }),
      }),
      asset: new Item({
        loader: ({build}) => build.loaders.file,
        options: ({store}) => ({
          name: `assets/${
            store.isTrue('hash')
              ? store.get('hashFormat')
              : store.get('fileFormat')
          }.[ext]`,
        }),
      }),
      ['resolve-url']: new Item({
        loader: ({build}) => build.loaders['resolve-url'],
        options: ({path, hooks}) => ({
          root: path('src'),
          sourceMap: hooks.filter('build/devtool') ?? false,
        }),
      }),
    }

    this.rules = {
      css: new Rule({
        test: ({store}) => store.get('patterns.css'),
        exclude: ({store}) => store.get('patterns.modules'),
        use: ({isProduction, build}) => [
          isProduction ? build.items.minicss : build.items.style,
          build.items.css,
        ],
      }),
      js: new Rule({
        test: ({store}) => store.get('patterns.js'),
        exclude: ({store}) => store.get('patterns.modules'),
        use: [],
      }),
      image: new Rule({
        test: ({store}) => store.get('patterns.image'),
        exclude: ({store}) => store.get('patterns.modules'),
        use: ({build}) => [build.items['asset']],
      }),
      font: new Rule({
        test: ({store}) => store.get('patterns.font'),
        exclude: ({store}) => store.get('patterns.modules'),
        use: ({build}) => [build.items['resolve-url']],
      }),
      md: new Rule({
        test: ({store}) => store.get('patterns.md'),
        exclude: ({store}) => store.get('patterns.modules'),
        use: ({build}) => [
          build.items['html'],
          build.items['md'],
        ],
      }),
      svg: new Rule({
        test: ({store}) => store.get('patterns.svg'),
        exclude: ({store}) => store.get('patterns.modules'),
        type: 'asset/resource',
      }),
      html: new Rule({
        test: ({store}) => store.get('patterns.html'),
        use: ({build}) => [build.items['html']],
      }),
    }

    config.bind(this.app)()
  }
}

export {Build}
