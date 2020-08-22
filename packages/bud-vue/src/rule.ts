import {Use} from '@roots/bud'

const loader = require.resolve('vue-loader')

/**
 * Patched compiler.
 */
import compiler from './vue-template-compiler'

/**
 * Vue SFC rule
 */
const rule: Use = () => ({
  test: /\.vue$/,
  exclude: file =>
    /node_modules/.test(file) && !/\.vue\.js/.test(file),
  use: [
    {
      loader,
      options: {
        compiler,
      },
    },
  ],
})

export default rule
