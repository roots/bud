import {Bud} from '@roots/bud'

export default (bud: Bud) =>
  bud.entry({app: 'app.ts'}).template().typecheck()
