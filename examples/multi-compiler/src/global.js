const target = document.querySelector('body')
target.innerHTML = `
  <div>
    <h1>Built with the global compiler</h1>
  </div>
`

/**
 * Accept module updates
 *
 * @see https://webpack.js.org/api/hot-module-replacement
 */
import.meta.webpackHot?.accept(console.error)
