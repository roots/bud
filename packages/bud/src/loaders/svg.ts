import {Loader} from 'webpack'
import svgToMiniDataUri from 'mini-svg-data-uri'

const svg: Loader = {
  loader: require.resolve('url-loader'),
  options: {
    generator: content => svgToMiniDataUri(content.toString()),
  },
}

export = svg
