import '@roots/bud-postcss/types'
import {type Bud} from '@roots/bud'

export default async (bud: Bud) => {
  bud
    .entry(`app`, [`scripts/index`, `styles/app`])
    .watch([bud.path(`@src`, `images`)])
    .serve(3015)
    .html()
}
