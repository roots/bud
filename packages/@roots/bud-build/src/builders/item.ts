import {Framework} from '@roots/bud-framework'
import svgToMiniDataUri from 'mini-svg-data-uri'

/**
 * Item hooks
 */
export function items(this: Framework): void {
  /**
   * item/css
   */
  this.publish({
    'item/css': () => ({
      loader: this.subscribe('item/css/loader'),
      options: this.subscribe('item/css/options'),
    }),
    'item/css/loader': () => this.subscribe('loader/css'),
    'item/css/options': () => ({
      sourceMap: this.subscribe('item/css/options/sourceMap'),
    }),
    'item/css/options/sourceMap': () =>
      !this.store.isFalse('options.devtool'),
  })

  /**
   * item/file
   */
  this.publish({
    'item/file': () => ({
      loader: this.subscribe('item/file/loader'),
      options: this.subscribe('item/file/options'),
    }),
    'item/file/loader': () => this.subscribe('loader/file'),
    'item/file/options': () => ({
      name: this.subscribe('item/file/options/name'),
    }),
    'item/file/options/name': () =>
      `${
        this.store.isTrue('options.hash')
          ? this.store.get('options.hashFormat')
          : this.store.get('options.fileFormat')
      }.[ext]`,
  })

  /**
   * item/image
   */
  this.publish({
    'item/image': () => ({
      loader: this.subscribe('item/file/loader'),
      options: this.subscribe('item/image/options'),
    }),
    'item/image/options': () => ({
      name: this.subscribe('item/image/options/name'),
    }),
    'item/image/options/name': () =>
      `images/${
        this.store.isTrue('options.hash')
          ? this.store.get('options.hashFormat')
          : this.store.get('options.fileFormat')
      }.[ext]`,
  })

  /**
   * item/font
   */
  this.publish({
    'item/font': () => ({
      loader: this.subscribe('item/file/loader'),
      options: this.subscribe('item/font/options'),
    }),
    'item/font/options': () => ({
      name: this.subscribe('item/font/options/name'),
    }),
    'item/font/options/name': () =>
      `fonts/${
        this.store.isTrue('options.hash')
          ? this.store.get('options.hashFormat')
          : this.store.get('options.fileFormat')
      }.[ext]`,
  })

  /**
   * item/resolve-url
   */
  this.publish({
    'item/resolve-url': () => ({
      loader: this.subscribe('item/resolve-url/loader'),
      options: this.subscribe('item/resolve-url/options'),
    }),
    'item/resolve-url/loader': () =>
      this.subscribe('loader/resolve-url'),
    'item/resolve-url/options': () => ({
      root: this.subscribe('location/dist'),
      sourceMap: this.subscribe(
        'item/resolve-url/options/sourceMap',
      ),
    }),
    'item/resolve-url/options/sourceMap': () =>
      !this.store.isFalse('options.devtool'),
  })

  /**
   * item/raw
   */
  this.publish({
    'item/raw': () => ({
      loader: this.subscribe('item/raw/loader'),
    }),
    'item/raw/loader': () => this.subscribe('loader/raw'),
  })

  /**
   * item/style
   */
  this.publish({
    'item/style': () => ({
      loader: this.subscribe('item/style/loader'),
    }),
    'item/style/loader': () => this.subscribe('loader/style'),
  })

  /**
   * item/svg
   */
  this.publish({
    'item/svg': () => ({
      loader: this.subscribe('item/svg/loader'),
      options: this.subscribe('item/svg/options'),
    }),
    'item/svg/loader': () => this.subscribe('loader/url'),
    'item/svg/options': () => ({
      name: this.subscribe('item/svg/options/name'),
      generator: (content: unknown) =>
        svgToMiniDataUri(content.toString()),
    }),
    'item/svg/options/name': () =>
      (this.store.isTrue('options.hash')
        ? this.store.get('options.hashFormat')
        : this.store.get('options.fileFormat')
      ).concat('.[ext]'),
  })

  /**
   * item/minicss
   */
  this.publish({
    'item/minicss': () => ({
      loader: this.subscribe('item/minicss/loader'),
      options: this.subscribe('item/minicss/options'),
    }),
    'item/minicss/loader': () =>
      this.subscribe('loader/minicss'),
    'item/minicss/options': () => ({
      publicPath: this.subscribe(
        'item/minicss/options/publicPath',
      ),
    }),
    'item/minicss/options/publicPath': () =>
      this.subscribe('location/publicPath'),
  })
}
