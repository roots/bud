import {main} from './components/main'

const foo = 'bar'

const init = () =>
  window.requestAnimationFrame(function ready() {
    return document.body ? main() : window.requestAnimationFrame(ready)
  })

init()
module?.hot?.accept()
