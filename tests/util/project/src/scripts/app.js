const init = async () =>
  window.requestAnimationFrame(async function ready() {
    return document.body
      ? await import(`./components/main`).then(({main}) => main())
      : window.requestAnimationFrame(ready)
  })

init()
module?.hot?.accept()
