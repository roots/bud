import MiniCss from 'mini-css-extract-plugin'

import {Loader} from '../Loader'

export const css = () =>
  new Loader(require.resolve('css-loader'))
export const csv = () =>
  new Loader(require.resolve('csv-loader'))
export const file = () =>
  new Loader(require.resolve('file-loader'))
export const html = () =>
  new Loader(require.resolve('html-loader'))
export const md = () =>
  new Loader(require.resolve('remark-loader'))
export const minicss = () => new Loader(MiniCss.loader)
export const resolveUrl = () =>
  new Loader(require.resolve('resolve-url-loader'))
export const style = () =>
  new Loader(require.resolve('style-loader'))
export const url = () =>
  new Loader(require.resolve('url-loader'))
export const xml = () =>
  new Loader(require.resolve('xml-loader'))
