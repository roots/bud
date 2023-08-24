import type {Config} from '@roots/bud'

const config: Config = async app => {
  app
    .entry(`app`, [`app.js`, `app.css`])
    .watch([`./watched`], {interval: 1000, usePolling: true})
}

export default config
