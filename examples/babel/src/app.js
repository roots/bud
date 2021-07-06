class CoolClass {
  message = ''

  constructor() {
    this.message = 'hello world'
  }

  sayHello() {
    return this.message
  }
}

const cool = new CoolClass()

const target = document.querySelector('body')
target.innerHTML = `
  <div>
    <h1>${cool.sayHello()}!</h1>
  </div>
`

/**
 * Accept module updates
 *
 * @see https://webpack.js.org/api/hot-module-replacement
 */
import.meta.webpackHot?.accept(err => {
  console.error(err)
})
