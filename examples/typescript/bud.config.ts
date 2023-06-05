import {Bud} from '@roots/bud'
import '@roots/bud-typescript'

export default async (bud: Bud) => {
  bud.entry({app: ['app']}).html()
}
