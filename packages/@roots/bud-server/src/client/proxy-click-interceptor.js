/* global __resourceQuery */
/* eslint-disable no-console, no-extra-semi */

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

    document.addEventListener('click', e => {
      const target = e.target.closest('a')
      if (!target || target.href.includes(origin.dev)) return
      target.href = target.href.replace(origin.proxy, origin.dev)
    })
  }

  window.requestAnimationFrame(async function ready() {
    return document.body
      ? await main()
      : window.requestAnimationFrame(ready)
  })
})()
