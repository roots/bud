import {main} from '@scripts/components/main'

const init = () =>
  window.requestAnimationFrame(function ready() {
    return document.body ? main() : window.requestAnimationFrame(ready)
  })

init()

if (import.meta.webpackHot)
  import.meta.webpackHot.accept('./components/main.js', init)
