import type {Config} from '@roots/bud'

const config: Config = async app => {
  app
    .entry(`app`, [`app.js`, `app.css`])
    .watch([`./watched`])
}

export default config
