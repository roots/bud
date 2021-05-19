import {Framework, Service} from '@roots/bud-framework'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import Webpack from 'webpack'
import {Loader} from '../Loader'
import {Rule} from '../Rule'
import {Item} from '../Item'
import {config} from './config'
import {boundMethod as bind} from 'autobind-decorator'
import {posix} from 'path'

class Build extends Service {
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
        loader: ({build}) => build.loaders.css,
        options: ({hooks}) => ({
          sourceMap: hooks.filter('build/devtool') ?? false,
          importLoaders: 1,
        }),
      }),
      style: new Item({
        loader: ({build}) => build.loaders.style,
      }),
      minicss: new Item({
        loader: ({build}) => build.loaders.minicss,
        options: (app: Framework) => ({
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
        loader: ({build}) => build.loaders.raw,
      }),
      ['file']: new Item({
        loader: ({build}) => build.loaders.file,
        options: ({store}) => ({
          name: `${
            store.isTrue('hash')
              ? store.get('hashFormat')
              : store.get('fileFormat')
          }.[ext]`,
        }),
      }),
      ['asset']: new Item({
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
        use: ({build}) => [build.items['raw']],
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
      svg: new Rule({
        test: ({store}) => store.get('patterns.svg'),
        exclude: ({store}) => store.get('patterns.modules'),
        type: 'asset/resource',
      }),
      html: new Rule({
        test: ({store}) => store.get('patterns.html'),
        exclude: ({store}) => store.get('patterns.modules'),
        use: ({build}) => [build.items['raw']],
      }),
    }

    config.bind(this.app)()
  }
}

export {Build}
