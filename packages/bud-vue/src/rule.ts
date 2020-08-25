import {Use} from '@roots/bud'

/** Patched compiler.*/
import compiler from './vue-template-compiler'

const loader = require.resolve('vue-loader')

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
