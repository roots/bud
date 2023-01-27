const init = async () =>
  window.requestAnimationFrame(async function ready() {
    return document.body
      ? await import('./components/main').then(({main}) => main())
      : window.requestAnimationFrame(ready)
  })

init()

import.meta.webpackHot?.accept(console.error)
