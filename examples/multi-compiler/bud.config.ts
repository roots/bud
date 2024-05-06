import {bud} from '@roots/bud'

await bud.make(`theme`, async compiler =>
  compiler
    .use(['@roots/bud-preset-recommend', '@roots/bud-tailwindcss'])
    .setPath(`@src`, `theme/src`)
    .setPath(`@dist`, `theme/dist`)
    .entry(`theme`, [`theme.js`, `theme.css`]),
)

await bud.make(`plugin`, async plugin =>
  plugin
    .use(['@roots/bud-preset-recommend', '@roots/bud-react'])
    .setPath(`@src`, `plugin/src`)
    .setPath(`@dist`, `plugin/dist`)
    .entry(`plugin`, [`plugin.js`, `plugin.css`]),
)
