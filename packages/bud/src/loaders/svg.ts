import svgToMiniDataUri from 'mini-svg-data-uri'
import {RuleSetLoader} from 'webpack'

export const loader: RuleSetLoader['loader'] = require.resolve(
  'url-loader',
)

export const options: RuleSetLoader['options'] = {
  generator: content => svgToMiniDataUri(content.toString()),
}
