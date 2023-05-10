import type {Bud} from '@roots/bud'
import args from '@roots/bud-support/utilities/args'

export default async (bud: Bud) => {
  bud
    .assets(`fonts`)
    .entry(`app`, [`scripts/app`, `styles/app`])
    .watch([bud.path(`@src`, `*.html`), bud.path(`@src`, `images`)])
    .serve(3015)
    .splitChunks(false)
    .minimize(false)
    .html({
      template: bud.path(`@src`, `index.html`),
      replace: {
        noScript: `You need to enable JavaScript to run this app`,
      },
    })

  // .assets([[`fonts`, `fontz`]])
  // .assets([[`fonts/test.otf`, `fontz/test.otf`]])
  // .copyDir([`fonts`, `vendor/fonts`])
  // .copyFile(`fonts/test.otf`)
  // .copyFile(`test.otf`, `@src/fonts`)
  // .copyFile([`test.otf`, `fonts/special-@base`], `@src/fonts`)
  // .copyFile([`README.md`, `markdown/@file`], await bud.module.getDirectory(`@roots/bud`))
}
