import type {Bud} from '@roots/bud'

/**
 * bud.js configuration
 */
export default async (bud: Bud) => {
  bud.entry(`app`, [`index.js`, `index.css`])
}
