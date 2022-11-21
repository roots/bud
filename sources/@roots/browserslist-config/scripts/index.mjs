import {generate} from './generate.mjs'

await generate(`broad.cjs`, [`last 4 versions`, `not dead`])
await generate(`current.cjs`, [`last 2 versions`, `not dead`])
await generate(`index.cjs`, [`last 3 versions`, `not dead`])
