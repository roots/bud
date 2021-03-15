const foo = 'baz'

console.log(foo)

document.querySelector('body').style.backgroundColor = 'black'

/**
 * Accept module updates
 *
 * @see https://webpack.js.org/api/hot-module-replacement
 */
if (module) {
  module.hot.accept(err => console.error(err))
}
