import {Build as Contract, Service} from '@roots/bud-framework'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import Webpack from 'webpack'
import {Loader} from '../Loader'
import {Rule} from '../Rule'
import {Item} from '../Item'
import {config} from './config'
import {boundMethod as bind} from 'autobind-decorator'
import {posix} from 'path'

export class Build extends Service implements Contract {
  public name = '@roots/bud-build'
  public loaders: {[key: string]: Loader} = {}
  public rules: {[key: string]: Rule} = {}
  public items: {[key: string]: Item} = {}

  public get config(): Webpack.Configuration {
    return this.app.hooks.filter<Webpack.Configuration>('build')
  }

  @bind
  public register(): void {
    this.loaders = {
      css: new Loader(require.resolve('css-loader')),
      style: new Loader(require.resolve('style-loader')),
      minicss: new Loader(MiniCssExtractPlugin.loader),
      file: new Loader(require.resolve('file-loader')),
      raw: new Loader(require.resolve('raw-loader')),
      url: new Loader(require.resolve('url-loader')),
      'resolve-url': new Loader(
        require.resolve('resolve-url-loader'),
      ),
    }

    this.items = {
      css: new Item({
        loader: app => app.build.loaders.css,
        options: app => ({
          sourceMap: app.hooks.filter('build/devtool') ?? false,
          importLoaders: 1,
        }),
      }),
      style: new Item({
        loader: app => app.build.loaders.style,
      }),
      minicss: new Item({
        loader: app => app.build.loaders.minicss,
        options: app => ({
          publicPath: posix.normalize(
            posix.dirname(
              posix.relative(
                app.path('project'),
                app.path('src'),
              ),
            ),
          ),
        }),
      }),
      ['raw']: new Item({
        loader: app => app.build.loaders.raw,
      }),
      ['file']: new Item({
        loader: app => app.build.loaders.file,
        options: app => ({
          name: `${
            app.store.isTrue('hash')
              ? app.store.get('hashFormat')
              : app.store.get('fileFormat')
          }.[ext]`,
        }),
      }),
      ['asset']: new Item({
        loader: app => app.build.loaders.file,
        options: app => ({
          name: `assets/${
            app.store.isTrue('hash')
              ? app.store.get('hashFormat')
              : app.store.get('fileFormat')
          }.[ext]`,
        }),
      }),
      ['resolve-url']: new Item({
        loader: app => app.build.loaders['resolve-url'],
        options: app => ({
          root: app.path('src'),
          sourceMap: app.hooks.filter('build/devtool') ?? false,
        }),
      }),
    }

    this.rules = {
      css: new Rule({
        test: app => app.store.get('patterns.css'),
        use: app => [
          app.isProduction
            ? app.build.items.minicss
            : app.build.items.style,
          app.build.items.css,
        ],
      }),
      js: new Rule({
        test: app => app.store.get('patterns.js'),
        exclude: app => app.store.get('patterns.modules'),
        use: app => [app.build.items['raw']],
      }),
      image: new Rule({
        test: app => app.store.get('patterns.image'),
        use: app => [app.build.items['asset']],
      }),
      font: new Rule({
        test: app => app.store.get('patterns.font'),
        use: app => [app.build.items['resolve-url']],
      }),
      svg: new Rule({
        test: app => app.store.get('patterns.svg'),
        type: 'asset/resource',
      }),
      html: new Rule({
        test: app => app.store.get('patterns.html'),
        use: app => [app.build.items['raw']],
      }),
    }

    config.bind(this.app)()
  }
}
