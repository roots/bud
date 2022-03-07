import {main} from './components/main'

const init = () =>
  window.requestAnimationFrame(function ready() {
    return document.body ? main() : window.requestAnimationFrame(ready)
  })

init()

module?.hot?.accept('./components/main.js', init)
