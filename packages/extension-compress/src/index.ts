import {Bud} from '@roots/bud'
import * as brotli from './brotli'
import * as gzip from './gzip'

// Extension name
export const name = '@roots/bud-compress'

// Extension interface
import './interface'

// Extension boot
export const boot = (app: Bud) => {
  app.use([brotli, gzip])
}
