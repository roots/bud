import {type Bud} from '@roots/bud'

export default async (bud: Bud) => {
  bud
    .entry(`app`, [`@scripts/app`, `@styles/app`])
    .watch([bud.path(`@src`, `*.html`), bud.path(`@src`, `images`)])
    .serve(3015)
    .splitChunks(false)
    .minimize(false)
    .html()

  // .assets([[`fonts`, `fontz`]])
  // .assets([[`fonts/test.otf`, `fontz/test.otf`]])
  // .copyDir([`fonts`, `vendor/fonts`])
  // .copyFile(`fonts/test.otf`)
  // .copyFile(`test.otf`, `@src/fonts`)
  // .copyFile([`test.otf`, `fonts/special-@base`], `@src/fonts`)
  // .copyFile([`README.md`, `markdown/@file`], await bud.module.getDirectory(`@roots/bud`))
}
