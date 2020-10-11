import autoprefixer from 'autoprefixer'

export const ident: Build.Item['ident'] = 'postcss'

export const loader: Build.Item['loader'] = loaders =>
  loaders.get('postcss')

export const options: Build.Item['options'] = {
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
