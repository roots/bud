import {babel, postCss, eslint} from './configs'

const schema = {
  babel: {presets: [], plugins: []},
  eslint: {},
  postCss: {plugins: []},
}

/**
 * Loader options
 */
const loaders = {
  babel: babel ? require(babel) : schema.babel,
  postCss: postCss ? require(postCss) : schema.postCss,
  svg: {
    use: [
      require.resolve('@svgr/webpack'),
      require.resolve('url-loader'),
    ],
  },
}

export {loaders}
