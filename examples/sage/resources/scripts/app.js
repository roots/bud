import {main} from '@scripts/components/main.js'

const init = () =>
  window.requestAnimationFrame(function ready() {
    return document.body ? main() : window.requestAnimationFrame(ready)
  })

init()

createRoot(document.getElementById('app')).render(<ReactComponent />)

if (import.meta.webpackHot)
  import.meta.webpackHot.accept('./components/main.js', init)
