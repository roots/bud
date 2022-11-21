import {generate} from './generate.mjs'

await generate(`broad.cjs`, [
  `last 4 chrome major versions`,
  `last 4 safari major versions`,
  `last 4 firefox major versions`,
  `not dead`,
])
await generate(`current.cjs`, [
  `last 2 chrome major versions`,
  `last 2 safari major versions`,
  `last 2 firefox major versions`,
  `not dead`,
])
await generate(`index.cjs`, [
  `last 3 chrome major versions`,
  `last 3 safari major versions`,
  `last 3 firefox major versions`,
  `not dead`,
])
