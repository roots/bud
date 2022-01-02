/* global __resourceQuery */
/* eslint-disable no-console, no-extra-semi */
// @ts-check

;(async () => {
  const main = async () => {
    const {headers} = await fetch(window.location.origin, {
      method: 'HEAD',
      mode: 'cors',
    })

    const origin = {
      proxy: headers.get('x-bud-proxy-origin'),
      dev: headers.get('x-bud-dev-origin'),
    }

    if (!origin.proxy || !origin.dev) return

    console.log(
      `%c[bud]%c intercepting anchor links`,
      'background: #525ddc; color: #ffffff;',
      'background: transparent;',
    )

    document.addEventListener('click', event => {
      event.preventDefault()

      if (!(event.target instanceof HTMLAnchorElement)) return

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
