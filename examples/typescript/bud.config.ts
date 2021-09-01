import {Framework} from '@roots/bud'
import * as BudBabelExtension from '@roots/bud-babel'
import * as BudTypeScriptExtension from '@roots/bud-typescript'

export default (bud: Framework) =>
  bud
    .use([BudBabelExtension, BudTypeScriptExtension])
    .entry({app: ['app.ts']})
    .template()
    .typecheck()
