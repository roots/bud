import autoprefixer from 'autoprefixer'

export const ident: Framework.Item['ident'] = 'postcss'
export const loader: Framework.Item['loader'] = 'postcss'
export const options: Framework.Item['options'] = {
  postcssOptions: {
    plugins: {
      autoprefixer: [autoprefixer, {}],
    },
    sourceMapOptions: null,
    syntax: null,
    parser: null,
    stringifier: null,
  },
}
