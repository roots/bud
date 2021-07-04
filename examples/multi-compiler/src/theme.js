const features = ['fancy', 'ecma']

features.map(feat => {
  console.log(feat)
})

/**
 * Accept module updates
 *
 * @see https://webpack.js.org/api/hot-module-replacement
 */
import.meta.webpackHot?.accept(console.error)
