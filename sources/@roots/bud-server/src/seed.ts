import {Framework} from '@roots/bud-framework'

const src = (modulePath: string) =>
  `@roots/bud-server/client/${modulePath}`

const makeHmr = (instance: Framework) =>
  src(`index.js?name=${instance.name}&path=/__bud/hmr`)

const makeClickInterceptor = () => src(`proxy-click-interceptor.js`)

/**
 * Initial values
 *
 * @public
 */
export const seed = (app: Framework) => {
  /* Urls */
  app.hooks.on(`dev.url`, new URL(`http://localhost:3000`))
  app.hooks.on(`middleware.proxy.target`, new URL(`http://localhost`))

  app.hooks.on(`dev.ssl.enabled`, false)
  app.hooks.on(`dev.client.scripts`, [makeHmr, makeClickInterceptor])

  app.hooks.on(`middleware.enabled`, [`dev`, `hot`])

  app.hooks.on(`dev.watch.files`, [])
  app.hooks.on(`dev.watch.options`, {})
}
