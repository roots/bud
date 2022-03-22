/* global __resourceQuery */
/* eslint-disable no-console, no-extra-semi */
// @ts-check

;(async () => {
  const main = async () => {
    const {headers} = await fetch(window.location.origin, {
      method: 'GET',
    })

    const origin = {
      proxy: headers.get('x-bud-proxy-origin'),
      dev: headers.get('x-bud-dev-origin'),
    }

    if (!origin.proxy || !origin.dev) return

    document.addEventListener('click', event => {
      // @ts-ignore
      const el = event.target.closest('a')
      const href = el?.getAttribute('href')

      if (!href || href.includes(origin.dev)) return

      Object.assign(el, {
        href: href.replace(origin.proxy, origin.dev),
      })
    })
  }

  window.requestAnimationFrame(async function ready() {
    return document.body
      ? await main()
      : window.requestAnimationFrame(ready)
  })
})()
