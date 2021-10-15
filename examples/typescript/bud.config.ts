import {Bud} from '@roots/bud'
import * as Babel from '@roots/bud-babel'
import * as TS from '@roots/bud-typescript'

export default (bud: Bud) =>
  bud
    .use([Babel, TS])
    .entry({app: 'app.ts'})
    .template()
    .typecheck()
