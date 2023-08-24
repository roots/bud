import type {Config} from '@roots/bud'

const config: Config = async app => {
  app
    .entry(`app`, [`app.js`, `app.css`])
    .watch([`./watched`], {usePolling: true, interval: 1000})
}

export default config
