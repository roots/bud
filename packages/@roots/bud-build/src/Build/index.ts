import {Framework, Service} from '@roots/bud-framework'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import RemarkHTML from 'remark-html'
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
    const config = this.app.hooks.filter('build')
    return config
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
      minicss: new Loader(MiniCssExtractPlugin.loader),
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
