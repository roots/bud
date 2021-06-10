import {Framework} from '@roots/bud'

import babel from '@roots/bud-babel'
import typescript from '@roots/bud-typescript'

export default (bud: Framework) =>
  bud
    .use([babel, typescript])
    .entry({app: ['app.ts']})
    .template()
