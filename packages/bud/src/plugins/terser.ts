import TerserPlugin, {
  TerserPluginOptions,
} from 'terser-webpack-plugin'

export const options: TerserPluginOptions = {
  terserOptions: {
    parse: {
      ecma: 2018,
    },
    compress: {
      ecma: 5,
      comparisons: false,
      inline: 2,
    },
    mangle: {
      safari10: true,
    },
    output: {
      ecma: 5,
      comments: false,
      ascii_only: true,
    },
  },
  extractComments: false,
  parallel: true,
}

export const make: Framework.Extension.Make = (
  opts: TerserPluginOptions,
) => new TerserPlugin(opts)

export const when: Framework.Extension.When = ({features}) =>
  features.enabled('minify')
